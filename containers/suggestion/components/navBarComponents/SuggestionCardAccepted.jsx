/**
 * @author [Marius]
 */
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import ModalReasonComponent from '../../modal/ModalReasonComponent';
import ESugestionStatus from '../ESugestionStatus';
import "../style/cardStyle.css";


const SuggestionCardAccepted = (props) => {
    return (

        <tr key={ props.suggestion.id}>
            <td className="td-card">
                <div className="card cardy">
                    <div className="card-body" style={{backgroundColor:"#F5F5F5"}}>
                        <div className="row">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                            {props.user && props.user.role==="ADMIN"?
                             
                             <React.Fragment>
                                  <ModalReasonComponent
                                        title={props.suggestion.title} id={props.suggestion.id}  type={false}
                                        classNameProp={"push_simple orange"} status={ESugestionStatus.ACCEPTED}
                                    ></ModalReasonComponent>
                             </React.Fragment>         
                             :null
                            }   
                        </div>
                        <div className="row">
                            <div className="column column1-card">
                                <object className="card-image img img-rounded img-fluid" data={ props.suggestion.photo} type="image/png">
                                    <img className="card-image-anon" src="/images/profile_man.jpg" alt="" />
                                </object>
                                <p className="name-text">{ props.suggestion.firstAndLastName}</p>
                                <p className="text-secondary text-center">{ props.suggestion.postDate}</p>
                            </div>
                            <div className="column column2-card">
                                <p className="title-design">
                                    <a ><strong>{ props.suggestion.title}</strong></a>
                                </p>
                                <p className="suggestion-text">{ props.suggestion.text}</p>
                                {
                                props.user.role === 'ADMIN' ? 
                                (
                                <p>
                                    <button id={"accept" +  props.suggestion.id} className="push_button grey" onClick={() =>  props.implemented( props.suggestion.id)} >Implement</button>
                                    <ModalReasonComponent classNameProp={"push_button grey"} title={props.suggestion.title} id={props.suggestion.id} status={ESugestionStatus.ACCEPTED} type={true} ></ModalReasonComponent>


                                </p>
                                )
                                :
                                (<div></div>)
                                }
                                <p>

                                </p>
                                <div>
                                <a className="score-label1"> <i></i> <span className="score-p1">
                                        <FaHeart style={{ color: "red", width: "20px", height: "20px" }} />
                                        {" " + props.suggestion.score}
                                    </span></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </td>
        </tr>
    )
}

export default SuggestionCardAccepted;