'use client';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { record } from 'rrweb';

const userId = 'wfh';
let stopRecordFn = null;
let cacheEvents: any[] = [];
const window = {};

const socket = io('http://localhost:6789', {
  query: {
    name: 'monkey'
  }
});

socket.on('connect', () => {
  console.log('wfh---client-connect');
  socket.emit('register_user', userId, () => {
    console.log('wfh----register_user');
  });
});

socket.on('record', () => {
  stopRecordFn = record({
    emit(event) {
      cacheEvents.push(event);
      socket?.emit('record', event, (evt) => {
        console.log('wfh---->record---ack');
        cacheEvents = cacheEvents.filter((e) => e.timestamp !== evt.timestamp);
      });
    }
  });
});

class Fish extends React.Component<any, any> {
  static whyDidYouRender = true;
  render() {
    // console.log("wfh---Fish---render", this.props)
    return <div>{this.props.fish}</div>;
  }
}
class Cat extends React.Component<any, any> {
  static whyDidYouRender = true;
  render() {
    // console.log("wfh---cat---render", this.props)
    return <div>{this.props.cat}</div>;
  }
}

class Monkey extends React.PureComponent<any, any> {
  static whyDidYouRender = true;
  render() {
    // console.log('wfh---monkey---render', this.props);
    return <div>{this.props.monkey}</div>;
  }
}

export default function Home() {
  const [fish, setFish] = useState('fish');
  const [monkey, setMonkey] = useState('monkey');
  const [cat, setCat] = useState('cat');

  const onFish = useCallback(() => {
    setFish('newFish');
  }, []);
  const onMonkey = useCallback(() => {
    setMonkey('newMonkey');
  }, []);
  const onCat = useCallback(() => {
    setCat('newCat');
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div onClick={onFish}>change fish</div>
      <div onClick={onMonkey}>change monkey</div>
      <div onClick={onCat}>change cat</div>
      <Cat cat={cat} />
      <Fish fish={fish} />
      <Monkey monkey={monkey} fish={fish} />
    </main>
  );
}
