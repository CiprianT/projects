/**
 * @author [Marius]
 */
import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaArrowAltCircleUp, FaArrowCircleDown } from "react-icons/fa";
import EUserElevateRoles from "../helper/EUserElevateRoles";


const UsersInfo = (props) => {
    return (
        props.usersInfo.map(user =>{
             return <tbody >
                {
                    props.id !== user.userId &&
                    <React.Fragment>
                        <td>{user.username}</td>
                        <td>{user.firstName}  {user.lastName}</td>
                        <td>{user.role}</td>
                        <td style={{width:'300px', display:"flex", justifyContent:"center"}}>

                            <Button size="sm" style={{ backgroundColor: "#3EACBA" }}
                                onClick={() => { props.onClick(user, EUserElevateRoles[user.role] + 1) }}
                                disabled={EUserElevateRoles[user.role] + 1 > 2}
                            >
                                <FaArrowAltCircleUp />
                            </Button>
                            <Button size="sm" style={{ backgroundColor: "#3EACBA" }}
                                onClick={() => { props.onClick(user, EUserElevateRoles[user.role] - 1) }}
                                disabled={EUserElevateRoles[user.role] - 1 < 0}
                            >
                                <FaArrowCircleDown />
                            </Button>
                        </td>
                    </React.Fragment>

                }

            </tbody>
        }
        )
    )
}
export default UsersInfo;