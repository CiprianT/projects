import React from 'react';

const CustomDropdown = ({
    className,
    onClick,
    selected,
    isDisabled
}) => {
    return (
        <div style={{ marginLeft: "161px" }}>
            
            {
                isDisabled === true ?
                    < select disabled defaultValue={true} className={className} onChange={onClick} style={{backgroundColor:"#d3d3d3"}}>
                        <option value={false} selected={!selected}>Sort by Score</option>
                        <option value={true} selected={selected}>Sort by Date</option>
                    </select>

                    : <select defaultValue={true} className={className} onChange={onClick}>
                        <option value={false} selected={!selected}>Sort by Score</option>
                        <option value={true} selected={selected}>Sort by Date</option>
                    </select>
            }

        </div >

    )
}

export default CustomDropdown;