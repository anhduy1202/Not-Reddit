import "./footer.css";
const Footer = (props) => {
    const {setOpen,isOpenPost} = props;
    return (  
        <footer className="footer">
            <div className="footer-title" onClick={()=> setOpen(!isOpenPost)}>
                {isOpenPost ? 'x' : '+'}
            </div>
        </footer>
    );
}
 
export default Footer;