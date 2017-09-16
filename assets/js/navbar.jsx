var React = require('react');
var ReactDOM = require('react-dom');

var Navbar = React.createClass({
    render: function() {
        return (
            <nav className="header navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">PTT Rank</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">熱門文章<span className="sr-only">(current)</span></a></li>
                            <li><a href="#">吵架專區</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});

export default Navbar;