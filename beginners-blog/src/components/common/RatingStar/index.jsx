import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function RatingStar(props) {
    const { isShowValue, value, maxRating, handleRating } = props;
    const [rating, setRating] = useState(0);

    function handleRatingClick(index) {
        setRating(index + 1);
        handleRating(index + 1);
    }

    return isShowValue ? (
        <div className="rating-star">
            {[...Array(maxRating)].map((_, index) => {
                return (
                    <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className={index < value ? "star filled" : "star empty"}
                    />
                );
            })
            }
        </div >
    ) :
        (
            <div className="rating-star">
                {[...Array(props.maxRating)].map((_, index) => {
                    return (
                        <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            className={index < rating ? "star filled" : "star empty"}
                            onClick={() => handleRatingClick(index)}
                        />
                    );
                })
                }
            </div >
        )
}

export default RatingStar;