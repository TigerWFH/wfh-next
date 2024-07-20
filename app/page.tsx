'use client';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { record } from 'rrweb';

const userId = 'wfh';
let stopRecordFn = null;
let cacheEvents: any[] = [];
const window: any = {};

export function getWindowHeight(): number {
  return (
    window.innerHeight ||
    (document.documentElement && document.documentElement.clientHeight) ||
    (document.body && document.body.clientHeight)
  );
}

export function getWindowWidth(): number {
  return (
    window.innerWidth ||
    (document.documentElement && document.documentElement.clientWidth) ||
    (document.body && document.body.clientWidth)
  );
}

const socket = io('http://localhost:6789/clients', {
  query: {
    userId
  }
});

socket.on('connect', () => {
  console.log('wfh---client-connect');
});

socket.on('start_record', () => {
  console.log('start_record');
  stopRecordFn = record({
    emit(event) {
      cacheEvents.push(event);
      console.log('user_interact', event);
      socket?.emit('user_interact', { userId, event }, (params) => {
        console.log('wfh---->record---ack');
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

  const getSession = () => {
    socket.emit('request_session', { userId }, (params) => {
      const { code, data } = params;
      if (code === 0) {
        console.log('active_page', userId);
        socket.emit('active_page', {
          userId,
          width: getWindowWidth(),
          height: getWindowHeight()
        });
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={getSession}>获取session</button>
      <div onClick={onFish}>change fish</div>
      <div onClick={onMonkey}>change monkey</div>
      <div onClick={onCat}>change cat</div>
      <Cat cat={cat} />
      <Fish fish={fish} />
      <Monkey monkey={monkey} fish={fish} />
    </main>
  );
}
