import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import './List.css'
import {Llist} from "../../utils/LinkedList";

const heightRow = 60

export const List:FC<any> = ({data}) => {
    const [list, setList] = useState(data)
    const [listHeight, setListHeight] = useState<number>(0)
    const [scrollTop, setScrollTop] = useState<number>(0)

    const maxRowRender = Math.floor(listHeight / heightRow)

    const getCalculateVisibleWindow =(top: number, bottom: number, height: number)=> {
        return (top + listHeight > scrollTop ) && (bottom - (listHeight * 2) - height >= scrollTop)
    }

    const splitArray = useMemo(() => {
        let nodes = new Llist();
        let subArr: any[] = []
        let count = 0

        let summaryTop = 0
        let summaryBottom = heightRow * data.length

        for (let i = 0; i < data.length; i++) {
            if (subArr.length + 1 === maxRowRender) {
                const height = listHeight + listHeight * count
                let top = i === maxRowRender - 1  ? 0 : summaryTop + listHeight
                summaryTop = summaryTop + listHeight
                let bottom = top + height
                const isVisible = getCalculateVisibleWindow(top, summaryBottom, height)
                nodes.push({dataList: subArr, height, count: ++count, top,bottom, summaryBottom, isVisible })
                summaryBottom = summaryBottom - listHeight
                subArr = []
            } else {
                subArr.push(i)
            }
        }

        if (!!subArr.length) {
            const height = listHeight * count + (subArr.length - 1) * heightRow
            const top = summaryTop + listHeight
            let bottom = top + height
            const isVisible = getCalculateVisibleWindow(top, summaryBottom, height)
            nodes.push({dataList: subArr, height, top, bottom, summaryBottom, isVisible })
        }
        return nodes
    },[data,listHeight, maxRowRender, scrollTop])

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const containerHeight = parseInt(String(containerRef.current.clientHeight), 10)
            setListHeight(containerHeight)
        }

    },[containerRef])

    const handleScroll = (event: any) => {
        const scrollTop = event.target.scrollTop;
        setScrollTop(scrollTop)
    }

    console.log('scrollTop', scrollTop, listHeight, maxRowRender, splitArray, splitArray.toArray())

    return (
        <div className="container" ref={containerRef} onScroll={handleScroll}>
              {list.map((elm: any) => (
                  <div className="element" key={elm}>{elm}</div>
              ))}

            {/*{splitArray.toArray().map((elm: any) => (*/}
            {/*    <div className="element" key={elm}>{elm.height}</div>*/}
            {/*))}*/}
        </div>
    );
}
