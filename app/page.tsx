'use client';
import Image from "next/image";
import React, {useState, useCallback} from "react";

class Fish extends React.Component<any, any> {
  static whyDidYouRender = true;
  render() {
    // console.log("wfh---Fish---render", this.props)
    return <div>
      {this.props.fish}
    </div>
  }
}
class Cat extends React.Component<any, any> {
  static whyDidYouRender = true;
  render() {
    // console.log("wfh---cat---render", this.props)
    return <div>
      {this.props.cat}
    </div>
  }
}

class Monkey extends React.PureComponent<any, any> {
  static whyDidYouRender = true;
  render() {
    // console.log("wfh---monkey---render", this.props)
    return <div>
      {this.props.monkey}
    </div>
  }
}

export default function Home() {
  const [fish, setFish] = useState('fish')
  const [monkey, setMonkey] = useState('monkey')
  const [cat, setCat] = useState('cat')

  const onFish = useCallback(() => {
    setFish("newFish")
  }, [])
  const onMonkey = useCallback(() => {
    setMonkey("newMonkey")
  }, [])
  const onCat = useCallback(() => {
    setCat("newCat")
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div onClick={onFish}>change fish</div>
      <div onClick={onMonkey}>change monkey</div>
      <div onClick={onCat}>change cat</div>
      <Cat cat={cat}/>
      <Fish fish={fish}/>
      <Monkey monkey={monkey} fish={fish}/>
    </main>
  );
}
