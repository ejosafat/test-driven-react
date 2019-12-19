import React from 'react';
import PropTypes from 'prop-types';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import HasIndex from './HasIndex';
import AutoAdvances from './AutoAdvances';

export class Carousel extends React.PureComponent {
  static propTypes = {
    defaultImg: CarouselSlide.propTypes.Img,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    slideIndex: PropTypes.number.isRequired,
    slideIndexIncrement: PropTypes.func.isRequired,
    slideIndexDecrement: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
    defaultImg: CarouselSlide.defaultProps.Img,
  };

  handlePrevClick = () => {
    const { slides, slideIndexDecrement } = this.props;
    slideIndexDecrement(slides.length);
  };

  handleNextClick = () => {
    const { slides, slideIndexIncrement } = this.props;
    slideIndexIncrement(slides.length);
  };

  render() {
    const {
      defaultImgHeight,
      defaultImg,
      slides,
      slideIndex,
      slideIndexDecrement: _slideIndexDecrement,
      slideIndexIncrement: _slideIndexIncrement,
      ...rest
    } = this.props;
    return (
      <div {...rest}>
        <CarouselSlide
          imgHeight={defaultImgHeight}
          Img={defaultImg}
          {...slides[slideIndex]}
        />
        <CarouselButton data-action="prev" onClick={this.handlePrevClick}>
          Prev
        </CarouselButton>
        <CarouselButton data-action="next" onClick={this.handleNextClick}>
          Next
        </CarouselButton>
      </div>
    );
  }
}

export default HasIndex(
  AutoAdvances(Carousel, 'slideIndex', 'slides'),
  'slideIndex'
);
