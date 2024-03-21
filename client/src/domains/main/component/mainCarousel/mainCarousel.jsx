import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CommonBanner from 'component/banner/commonBanner';
import { useGetCarouselItem } from 'domains/main/hooks/useGetCarouselItem';
import { useMediaQuery } from 'react-responsive';
import { useEventLog } from 'domains/main/hooks/useEventLog';

export const Carousel = () => {
  const { data: bannerItem } = useGetCarouselItem();
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const { mutate } = useEventLog();
  const [logId, setLogId] = useState([]);

  const settings = {
    dots: false, //화면아래 컨텐츠 갯수 표시
    autoplay: true, // 자동 스크롤 사용 여부
    autoplaySpeed: 5000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    draggable: true, //드래그 가능 여부
    infinite: true, //무한반복옵션
    lazyLoad: true,
    speed: 400, //다음버튼 누르고 다음화면 뜨는데까지 걸리는 시간
    slidesToShow: 1, //화면에 보여질 개수
    arrows: false,
    beforeChange: (curIndex) => {
      if (logId.includes(curIndex)) return;
      mutate(
        { advertisementId: bannerItem?.[curIndex]._id, logType: 'impression' },
        {
          onSuccess: () => {
            setLogId((prev) => [...prev, curIndex]);
          },
        },
      );
    },
    responsive: [
      {
        breakpoint: 500,
        settings: {
          dots: false,
        },
      },
    ],
  };

  const slickRef = useRef();

  const handlePrev = () => {
    slickRef.current.slickPrev();
  };

  const handleNext = () => {
    slickRef.current.slickNext();
  };

  return (
    <Slider {...settings} ref={slickRef}>
      {bannerItem?.map((banner, idx) => {
        return (
          <CommonBanner
            key={idx}
            id={banner._id}
            title={banner.mainCopy}
            imageUrl={isMobile ? banner.smallImageUrl : banner.imageUrl}
            link={banner.link}
            onNext={handleNext}
            onPrev={handlePrev}
            log={mutate}
            currentIndex={idx}
            totalLength={bannerItem?.length}
          />
        );
      })}
    </Slider>
  );
};
