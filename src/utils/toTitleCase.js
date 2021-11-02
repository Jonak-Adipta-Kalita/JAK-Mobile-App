import PropTypes from "prop-types";

const toTitleCase = (string) => {
    let sentence = string.toLowerCase().split(" ");

    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }

    return sentence.join(" ");
};

toTitleCase.propTypes = {
    string: PropTypes.string.isRequired,
};

export default toTitleCase;
