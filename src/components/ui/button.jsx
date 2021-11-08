import './index.css';

export const Button = (props, handleValidationClick, children) => {
    const myClass = `button ${props.type}`

    return (
    <button onClick={handleValidationClick} className={myClass}>{children}</button>
    );
};

/*Button.propTypes = {
    type: PropTypes.string,
    buttonText: PropTypes.string,
    loading: PropTypes.bool,
    onClick: PropTypes.func
  };
*/
Button.defaultProps = {
    type: "secondary"
   };
  

