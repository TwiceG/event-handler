import logo from './../assets/images/home-page-logo.png'

const Homepage: React.FC = () => {
    return (
        <div className="homepage-container">
            <h1 className="title">Welcome!</h1>
            <div className="picture-container">
                <img src={logo} alt="Welcome" className="picture" />
            </div>
            <div className="information">
                <p>This is some information about the page.</p>
            </div>
        </div>
    );
};

export default Homepage;
