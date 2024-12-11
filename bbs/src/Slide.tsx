import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators,
    CarouselCaption,} from 'reactstrap';

const items = [//이미지 소스 정의
    {
src:'https://picsum.photos/id/123/1200/400',
altText:'Silde 1',
caption:'Silde 1',
key:1,
    },
    {
        src:'https://picsum.photos/id/456/1200/400',
        altText:'Silde 2',
        caption:'Silde 2',
        key:2,
    },
    {
        src:'https://picsum.photos/id/678/1200/400',
        altText:'Silde 3',
        caption:'Silde 3',
        key:3,
    },
];

//작동할때 사용하는 함수
function Slide(args:any){
    const [activeIndex, setActiveIndex] = useState(0);
    //상수 activeIndex, setActiveIndex 들을 useState초기화 적용
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex +1;
    }

    const previous = () => {
        if (animating) return;
        const nextIndex =  activeIndex === 0 ? items.length -1 : activeIndex - 1;
    }

const goToIndex = (newIndex:any) =>{
    if(animating) return;
    setActiveIndex(newIndex);
}
const slides = items.map((item) => {
    return(
<CarouselItem
onExiting={() => setAnimating(true)}
onExited={() => setAnimating(false)}
key={item.src}
>
    <img src={item.src} alt={item.altText} className='w-100'/>
    <CarouselCaption
    captionText={item.caption}
    captionHeader={item.caption}
    />
</CarouselItem>
);
});

return(
    <Carousel
    activeIndex={activeIndex}
    next={next}
    previous={previous}
    {...args}//확산연산자 es6에서 추가된 배열의 나머지 값을 받아오거나 편하게 확장하는것
    >
    <CarouselIndicators
    items={items}
    activeIndex={activeIndex}
    onClickHandler={goToIndex}
    />
    {slides}
<CarouselControl
direction='prev'
directionText='Previous'
onClickHandler={previous}
/>
<CarouselControl
direction='next'
directionText='Next'
onClickHandler={next}
/>
    </Carousel>
);



}
export default Slide;