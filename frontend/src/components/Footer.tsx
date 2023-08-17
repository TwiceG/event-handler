import "../styles/styles.css"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Tournament Organiser</p>
            </div>
        </footer>
    );
}

export default Footer;
