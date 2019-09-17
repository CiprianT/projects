/**
 * @author [Ciprian Teisanu]
 */
import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import "../components/style/cardStyle.css";
import { editSuggestionActionCreator } from '../redux/actionCreators/suggestionActionCreators';
import { loadTagsActionCreator } from '../redux/actionCreators/tagsActionCreators';
import { EditModal } from './EditModal';

class ModalEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            focused: false,
            id: -1,
            tag: '',
            selectedTags: [],
            title: 'blablabla',
            postDate: '',
            description: '',
            anon: true,
            validTitle: true,
            validDescription: true,
            validSelectedTags: true
        }
    }

    handleRemoveItem = (event, index) => {
        event.preventDefault();
        const { selectedTags } = this.state;
        selectedTags.splice(index, 1);

        this.setState({
            selectedTags,
            validSelectedTags: selectedTags.length > 0
        }
        );
    }
    editSuggestion = (event) => {
        event.preventDefault();
        const id = this.props.suggestion.id;
        const title = this.state.title;
        const text = this.state.description;
        const anonymous = this.state.anon;
        const tags = [...this.state.selectedTags];
        const userId = this.props.userId;
        const suggestion = {
            id,
            title,
            text,
            anonymous,
            tags,
            userId
        }
        if (this.state.validTitle && this.state.validDescription && this.state.validSelectedTags) {
            this.props.editSuggestion(suggestion);
            this.setModalStow(false);
        }
    }
    onChange = (event) => {
        const { value, name } = event.target;
        if (name === "anon") {
            this.setState({
                anon: !this.state.anon
            })
        }
        else {

            this.setState({
                [name]: value
            });

        }
    }
    onChangeTitle = (event) => {
        const { value, name } = event.target;
        if (value.length >= 4) {
            this.setState({
                validTitle: true
            })
        }
        else {
            this.setState({
                validTitle: false
            })
        }
        this.setState({
            [name]: value
        });
    }
    onChangeDescription = (event) => {
        const { value, name } = event.target;
        if (value.length >= 10) {
            this.setState({
                validDescription: true
            })
        }
        else {
            this.setState({
                validDescription: false
            })
        }
        this.setState({
            [name]: value
        });
    }

    setModalStow = (b) => {
        if(b === false){
            this.setState(state => ({
                validTitle: true,
                validDescription: true,
                validSelectedTags: true,
            }))
        }
        this.setState(state => ({
            modalShow: b,
            selectedTags: this.props.suggestion.tags,
            title: this.props.suggestion.title,
            description: this.props.suggestion.text,
            selectedTags: [...this.props.suggestion.tags]
        }))
        if(this.props.suggestion.firstAndLastName === "Anonymous")
            this.setState(state => ({
                anon: true,
            }))
        else
            this.setState(state => ({
                anon: false,
            }))
    }

    componentDidMount() {
        this.props.loadTags();
    }

    componentDidUpdate(prevProps) {
        const { tags: prevTags } = prevProps;
        const { tags: nextTags } = this.props;
        if (prevTags !== nextTags) {
            this.setState({
                tags: [...nextTags]
            })
        }

    }

    onSuggestionSelected = (event, { suggestion }) => {
        let arrSize = this.state.selectedTags.filter(item => item.name === suggestion.name).length;
        if (arrSize === 0) {
            this.setState(state => (
                {
                    selectedTags: [...state.selectedTags, { ...suggestion }],
                    validSelectedTags: true
                }
            ));
        }
        this.setState(state => ({
            tag: ''
        }));
        event.preventDefault();
    }
    handleInputKeyDown = (evt) => {
        if (evt.keyCode === 13 && evt.currentTarget.getAttribute('aria-activedescendant') === null) {
            let { value } = evt.target;
            value = value.toLowerCase();
            let arrSize = this.state.selectedTags.filter(item => item.name === value).length;
            if (arrSize === 0) {
                let arr = this.props.tags.filter(item => item.name === value);
                if (arr.length === 0) {
                    this.setState(state => ({
                        selectedTags: [...state.selectedTags, { name: value }],
                        validSelectedTags: true
                    }
                    ));
                }
                else {
                    let suggestion = arr[0];
                    this.setState(state => ({
                        selectedTags: [...state.selectedTags, { ...suggestion }],
                        validSelectedTags: true
                    }
                    ));
                }

            }
            this.setState(state => ({
                tag: ''

            }))
        }

    }

    render() {
        return (
            <React.Fragment>
                        <div onClick={() => this.setModalStow(true)} className="wrapIcon">
                            <FaPencilAlt className="divIcon"/>
                        </div>
                        <EditModal
                            show={this.state.modalShow}
                            validated={this.state.validated}
                            handleInputKeyDown={this.handleInputKeyDown}
                            handleRemoveItem={this.handleRemoveItem}
                            editSuggestion={this.editSuggestion}
                            onChange={this.onChange}
                            onHide={this.setModalStow}
                            value={this.state.tag}
                            items={this.state.selectedTags}
                            onSuggestionSelected={this.onSuggestionSelected}
                            onChangeTitle={this.onChangeTitle}
                            onChangeDescription={this.onChangeDescription}
                            validTitle={this.state.validTitle}
                            validDescription={this.state.validDescription}
                            validTags={this.state.validSelectedTags}
                            valueTitle={this.state.title}
                            valueDescription={this.state.description}
                            valueAnon={this.state.anon}
                        />
            </React.Fragment>
        )
    }

    }
    const mapStatToProps = (state) => {
    return {
        user: state.userReducer.user,
        tags: state.tagReducer.tagList,

    }

    }
    const mapDispatchToProps = dispatch => {
    return {
        loadTags: () => dispatch(loadTagsActionCreator()),
        editSuggestion: (suggestion) => dispatch(editSuggestionActionCreator(suggestion))
    };
};

export default connect(mapStatToProps, mapDispatchToProps)(ModalEditComponent);