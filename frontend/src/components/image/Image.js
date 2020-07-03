import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { ImgArea } from './styles';

class Image extends Component {
    state = {
        naturalHeight: '100%',
        naturalWidth: '100%',
        loading: true,
    }

    constructor(props) {
        super(props);
        this.setImgRef = img => {
            if (img) {
                this.img = img;
                this.setState({
                    ...this.state,
                    naturalHeight: `${this.img.naturalWidth}px`,
                    naturalWidth: `${this.img.naturalHeight}px`,
                });
            }
        };
    }

    hideSpinner = () => {
        this.setState({ loading: false });
    }

    render() {
        return (
            <ImgArea width={this.state.naturalWidth} height={this.state.naturalHeight}>
                <Loader type="Rings" visible={this.state.loading} />
                <img ref={this.setImgRef} src={this.props.src} alt={this.props.alt} onLoad={this.hideSpinner}/>
            </ImgArea>
        );
    }
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};

export default Image;
