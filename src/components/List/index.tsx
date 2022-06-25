import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import './List.css'
import {Llist} from "../../utils/LinkedList";

export const List:FC<any> = ({data}) => {
    const [list, setList] = useState(data)
    const [listHeight, setListHeight] = useState<number>(0)
    const [scrollTop, setScrollTop] = useState<number>(0)

    const maxRowRender = Math.floor(listHeight / 60)

    const splitArray = useMemo(() => {

        let nodes = new Llist();
        let subArr: any[] = []
        let count = 0

        for (let i = 0; i < data.length; i++) {
            if (subArr.length + 1 === maxRowRender) {
                const height = listHeight + listHeight * count
                nodes.push({dataList: subArr, height, count: ++count})
                subArr = []
            } else {
                subArr.push(i)
            }
        }

        if (!!subArr.length) {
            nodes.push({dataList: subArr, listHeight})
        }
        return nodes
    },[data,listHeight, maxRowRender])

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const containerHeight = parseInt(String(containerRef.current.clientHeight), 10)
            setListHeight(containerHeight)
        }

    },[containerRef])

    const handleScroll = (event: any) => {
        console.log('st__')
        const scrollTop = event.target.scrollTop;
        setScrollTop(scrollTop)
    }

    console.log('scrollTop', scrollTop, listHeight, maxRowRender, splitArray)

    return (
        <div className="container" ref={containerRef} onScroll={handleScroll}>
              {list.map((elm: any) => (
                  <div className="element" key={elm}>{elm}</div>
              ))}
        </div>
    );
}
