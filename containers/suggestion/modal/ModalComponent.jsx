/**
 * @author [Laura Luca]
 */
import React from 'react';
import { connect } from 'react-redux';
import "../components/style/cardStyle.css";
import { createSuggestionActionCreator } from '../redux/actionCreators/suggestionActionCreators';
import { loadTagsActionCreator } from '../redux/actionCreators/tagsActionCreators';
import { SuggestionModal } from './SuggestionModal';

class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            focused: false,
            tag: '',
            selectedTags: [],
            title: '',
            postDate: '',
            description: '',
            anon: true,
            invalidTitle: undefined,
            invalidDescription: undefined,
            invalidSelectedTags: false,
            reload: props.reload,
            validate: false,
        }

    }

    handleRemoveItem = (event, index) => {
        event.preventDefault();
        const { selectedTags } = this.state;
        selectedTags.splice(index, 1);

        this.setState({
            selectedTags,
        },
            () => {
                this.validate();
            }
        );
    }
    validate() {
        if (this.state.validate === true) {
            this.setState({
                invalidTitle: this.state.title.length < 4,
                invalidDescription: this.state.description.length < 10,
                invalidSelectedTags: this.state.selectedTags.length < 1
            })
        }


    }
    createSuggestion = (event) => {
        event.preventDefault();
        this.setState(
            {
                validate: true
            },
            () => {
                this.setState({
                    invalidTitle: this.state.title.length < 4,
                    invalidDescription: this.state.description.length < 10,
                    invalidSelectedTags: this.state.selectedTags.length < 1
                },
                    () => {
                        const title = this.state.title;
                        const text = this.state.description;
                        const author = this.props.user.id;
                        const anonymous = this.state.anon;
                        const tags = this.state.selectedTags;
                        const suggestion = {
                            title,
                            text,
                            author,
                            anonymous,
                            tags
                        }
                        if (this.state.invalidTitle === false && this.state.invalidDescription === false && this.state.invalidSelectedTags === false) {
                            this.props.createSuggestion(suggestion, this.state.reload,this.props.reloadMine);
                            if(this.state.reload===true){
                                this.props.clearFilteringTags();
                            }
                            this.setModalStow(false);
                        }
                    }
                )

            }
        )
    }
    
    onChange = (event) => {
        const { value, name } = event.target;
        if (name === "anon") {
            this.setState({
                anon: !this.state.anon
            },
                () => {
                    this.validate();
                })
        }
        else {

            this.setState({
                [name]: value
            },
                () => {
                    this.validate();
                }
            );

        }
    }

    setModalStow = (b) => {
        this.setState(state => ({
            invalidTitle: undefined,
            invalidDescription: undefined,
            invalidSelectedTags: false,
            validate: false,
            selectedTags: [],
            title: '',
            description: '',
            anon: true,
            modalShow: b,
            tag:'',
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

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        let arrSize = this.state.selectedTags.filter(item => item.name === suggestion.name).length;
        if (arrSize === 0) {
            this.setState(state => (
                {
                    selectedTags: [...state.selectedTags, { ...suggestion }],
                    invalidSelectedTags: false
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
                        invalidSelectedTags: false
                    }
                    ));
                }
                else {
                    let suggestion = arr[0];
                    this.setState(state => ({
                        selectedTags: [...state.selectedTags, { ...suggestion }],
                        invalidSelectedTags: false
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
                <div style={{ cursor: "pointer", height: "40px", width: "190px", marginTop: "5px", textAlign: "center", float: "left" }} className="create" >
                    <div onClick={() => this.setModalStow(true)} style={{ width: "150px", position: "relative", float: "left" }}>
                        <p style={{ marginTop: "5px", width: "150px", color: "#1E3A8E" }}><b>Create suggestion</b></p>
                    </div>
                    <div style={{ float: "right", marginTop: "5px", marginRight: "8px" }}>

                        <div style={{ borderRadius: "50%", backgroundColor: "#1E3A8E", color: "white", width: "24px", display: "block", marginTop: "3px", alignContent: "center" }} onClick={() => this.setModalStow(true)}>
                            <b>+</b>
                        </div>
                        <SuggestionModal
                            show={this.state.modalShow}
                            validated={this.state.validated}
                            handleInputKeyDown={this.handleInputKeyDown}
                            handleRemoveItem={this.handleRemoveItem}
                            createSuggestion={this.createSuggestion}
                            onChange={this.onChange}
                            onHide={this.setModalStow}
                            value={this.state.tag}
                            items={this.state.selectedTags}
                            onSuggestionSelected={this.onSuggestionSelected}
                            invalidTitle={this.state.invalidTitle}
                            invalidDescription={this.state.invalidDescription}
                            invalidTags={this.state.invalidSelectedTags}
                        />
                    </div>
                </div>

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
        createSuggestion: (suggestion, reload,reloadMine) => dispatch(createSuggestionActionCreator(suggestion, reload,reloadMine))

    };
};
export default connect(mapStatToProps, mapDispatchToProps)(ModalComponent);