import { imageList } from '@/api/mockData';
import Banner from '@/components/Banner';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Gallery from '@/components/Gallery';
import Star from '@/components/icons/Star';
import DateSelector from '@/components/Selector/DateSelector';
import DayNightSelector from '@/components/Selector/DayNightSelector';
import { css } from '@emotion/react';

const dateSelectorLabels = {
  left: '5/7',
  center: '5/8',
  right: '5/9',
};

const TestPage = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
        width: 80%;
        margin: 10rem auto;
      `}
    >
      {/* <h2>Notification</h2> */}
      <div
        css={css`
          display: flex;
          gap: 1rem;
        `}
      >
        <Button text='Button' onClick={() => alert('asdf')}></Button>
        <Button disabled text='Button' onClick={() => alert('asdf')}></Button>
        <Button
          text='custom style'
          css={css`
            color: red;
          `}
        />
      </div>
      <Button text='Button large' size='lg' />
      <div
        css={css`
          display: flex;
          gap: 1.4rem;
          width: 100%;
        `}
      >
        <Button text='큰 버튼' size='lg' />
        <Button text='큰 버튼' size='lg'>
          <input type='text' placeholder='child' size={1} />
        </Button>
      </div>

      <Star />
      {/* <Star size='sm' /> */}
      <Star color='secondary' size='sm' />
      <Banner text='default banner' />
      <Banner text='공지 제목' variant='primary' />
      <Banner
        text='아주 긴 공지 제목 Lorem ipsum dolor sit amet'
        variant='secondary'
        onClick={() => alert('asdf')}
      />
      <Card
        title='부스 이름'
        desc='설명'
        btnText='선택'
        btnOnClick={() => alert('btn clicked!')}
        onClick={() => alert('clicked!')}
      />
      <Card
        title='부스 이름2 Lorem, ipsum dolor sit'
        desc='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore rem possimus dolore. Sed quibusdam similique neque illo porro ducimus dolorum esse harum sit sunt, magnam qui deserunt error est a.'
        btnText='자세히 보기'
        imgUrl='/img-02.jpg'
        onClick={() => alert('clicked!')}
      />
      <DateSelector
        labels={dateSelectorLabels}
        onChange={(value) => console.log(value)}
      />
      {/* <DateSelector
        labels={{left:'12/21', center:'12/22', right:'12/23'}}
        onChange={(value) => console.log(value)}
      />
      <DateSelector
        labels={{left:'12/21', right:'12/23'}}
        onChange={(value) => console.log(value)}
      />
      <DateSelector
        labels={{left:'9/11', right:'9/12'}}
        onChange={(value) => console.log(value)}
      /> */}
      <DayNightSelector
        onChange={(value) => console.log(value)}
      />
      <Gallery images={imageList}></Gallery>
      <Gallery images={imageList} size='sqaure' dotControl></Gallery>
    </div>
  );
};

export default TestPage;
