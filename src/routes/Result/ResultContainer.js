import React, { useState, useEffect } from "react";
import ResultPresenter from "./ResultPresneter";
import { connect } from "react-redux";
import { searchSubWay } from "../../store/index";

const ResultContainer = ({ onSearchSubway, result }) => {
  const yamanoteList = [
    { jp: "品川", eng: "shinagawa", hiragana: "しながわ" },
    { jp: "大崎", eng: "oosaki", hiragana: "おおさき" },
    { jp: "五反田", eng: "gotanda", hiragana: "ごたんだ" },
    { jp: "目黒", eng: "meguro", hiragana: "めぐろ" },
    { jp: "日比谷", eng: "hibiya", hiragana: "ひびや" },
    { jp: "渋谷", eng: "shibuya", hiragana: "しぶや" },
    { jp: "原宿", eng: "harajuku", hiragana: "はらじゅく" },
    { jp: "代々木", eng: "yoyogi", hiragana: "よよひ" },
    { jp: "新宿", eng: "shinjuku", hiragana: "しんじゅく" },
    { jp: "新大久保", eng: "shinookubo", hiragana: "しんおおくぼ" },
    { jp: "高田馬場", eng: "takadanobaba", hiragana: "たかだのばば" },
    { jp: "目白", eng: "mejiro", hiragana: "めじろ" },
    { jp: "池袋", eng: "ikebukuro", hiragana: "いけぶくろ" },
    { jp: "大塚", eng: "ootsuka", hiragana: "おおつか" },
    { jp: "巣鴨", eng: "sugamo", hiragana: "すがも" },
    { jp: "駒込", eng: "komagome", hiragana: "こまごめ" },
    { jp: "田端", eng: "tabata", hiragana: "たばた" },
    { jp: "西日暮里", eng: "nishinippori", hiragana: "にしにっぽり" },
    { jp: "日暮里", eng: "nippori", hiragana: "にっぽり" },
    { jp: "鶯谷", eng: "uguisudani", hiragana: "うぐいすだに" },
    { jp: "上野", eng: "ueno", hiragana: "うえの" },
    { jp: "御徒町", eng: "okachimachi", hiragana: "おかちまち" },
    { jp: "秋葉原", eng: "akihabara", hiragana: "あきはばら" },
    { jp: "神田", eng: "kanda", hiragana: "かんだ" },
    { jp: "東京", eng: "tokyo", hiragana: "とうきょう" },
    { jp: "有楽町", eng: "yuurakucho", hiragana: "ゆうらくちょう" },
    { jp: "新橋", eng: "shinbashi", hiragana: "しんばし" },
    { jp: "浜松町", eng: "hamamatsucho", hiragana: "はままつちょう" },
    { jp: "田町", eng: "tamachi", hiragana: "たまち" },
    {
      jp: "高輪ゲートウェイ",
      eng: "takanawagateway",
      hiragana: "たかなわげーとうぇい",
    },
  ];

  const [searchSubWayList, setSearchSubwayList] = useState(yamanoteList);
  const [textConatiner, setTextConatiner] = useState("");

  useEffect(() => {
    letSearch(textConatiner);
  }, [result]);

  //input 값이 바뀔때마다 실행됨
  const onSearchChange = (e) => {
    let target = e.target.value;
    setTextConatiner(target);
    onSearchSubway({ inputData: target, visibility: "block" });
  };

  //input 값에 따른 풀다운리스트 초기화진행
  const letSearch = (target) => {
    let searchText = target;
    let tempList = yamanoteList.filter(
      (item) =>
        compareText(item.hiragana, searchText) ||
        compareText(item.eng, searchText) ||
        compareText(item.jp, searchText)
    );
    setSearchSubwayList(tempList);
  };

  //리스트의 컨텐츠를 클릭했을 때 실행
  const contentClick = (e) => {
    let selectedData = e.target.innerText;
    setSearchSubwayList([]);
    onSearchSubway({ inputData: selectedData, visibility: "none" });
  };

  //인풋값 텍스트와 리스트안의 텍스트를 비교하는 함수
  const compareText = (frt, snd) => {
    let frtArr = frt?.split("");
    let sndArr = snd?.split("");
    let isCorrect = true;
    for (let i = 0; i < sndArr.length; i++) {
      if (frtArr[i] !== sndArr[i]) isCorrect = false;
    }
    return isCorrect;
  };

  return (
    <ResultPresenter
      onSearchChange={onSearchChange}
      filterList={searchSubWayList}
      contentClick={contentClick}
      state={result}
    />
  );
};

const mapStateToProps = (state) => {
  return { result: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchSubway: (target) => {
      dispatch(searchSubWay(target));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);
