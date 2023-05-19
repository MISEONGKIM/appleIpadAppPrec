### 반응형 디자인 연습

## css

- img는 inline요소라서 text처럼 baseline이라는 하단에 빈영역이 생김.

- width가 아니라 최대가로 너비로 지정하는 이유 : 1020px이하일 경우 자동으로 요소의 너비가 화면에 맞춰질 수 있게 제어하기 위함

```
header .inner {
  max-width: 1020px;
}
```

- calc 함수로 단위가 다른 2가지의 값 계산

```
 top: calc(100% + 4px);
```

- 애니메이션 적용할 땐 visibilty로 요소를 숨겨준다. display:none 사용하면 애니메이션 적용안됨.

  - display는 요소의 특성을 나타내는 속성
  - visibility는 요소의 상태를 나타내는 속성이다.

- 자연스럽게 나타나는 효과를 위해 아래처럼 요소를 숨긴다

```
visibility: hidden;
opacity: 0;
```

- transform-origin : 기본 값은 50% 50% 인데, 이렇게 되면 중앙을 기준으로 scale에 준 값만큼 줄어듬,
  transform-origin: 0 0을 하면 좌측상단꼭지점 기준으로 크기가 줄어든다.

```
.camera .stage video {
    top: 23px;
    left: 50px;
    transform: scale(0.65);
    transform-origin: 0 0;
  }
```

- 지그재그로 쌓이는 구조를 위해서
  height 값을 주고 wrap을 이용,
  한줄에서 정렬이 아니라 wrap으로 인해
  여러줄이 되었으니 align-content 사용해서 정렬

```
footer .navigations {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  height: 344px;
  flex-wrap: wrap;
  align-content: "space-between";
}
```

- 아코디언 효과

  - 접혔을 때

    ```
    footer .navigations .map ul {
        /*height 0이니까 overflow: hidden하면
        자식 요소들 (li태그들) 숨김*/
        height: 0;
        overflow: hidden;
        transition: transform 0.6s, opacity 0.4s;
        transform: translate(0, -20px);
        opacity: 0;
    }
    ```

  - 폈을 때

    ```
    footer .navigations .map.active ul {
        height: auto;
        overflow: visible;
        padding: 6px 0 18px;
        transform: translate(0, 0);
        opacity: 1;
    }

    ```

* gap : 위아래 좌우;

```
    footer .legal ul {
        flex-wrap: wrap;
        /_ flex-wrap: wrap이니까 2줄 될 수 있음,
        위아래 6px , 좌우 21px_/
        gap: 6px 21px;
    }
```

## js

- 요소의 가시성 관찰
  IntersectionObserver

- el.classList.add(), el.classList.remove()의 역할을 동시에 함

```
el.classList.toggle("active");
```
