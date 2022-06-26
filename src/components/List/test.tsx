import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './List.css'
import {Llist} from "../../utils/LinkedList";

export const List:FC<any> = ({data}) => {
    const [nodeArray, setNodeArray] = useState([])
    const [listHeight, setListHeight] = useState<number>(0)
    const [scrollTop, setScrollTop] = useState<number>(0)
    const [heightRow, setHeightRow] = useState<number>(0)

    const maxRowRender = Math.floor(listHeight / heightRow)

    const getCalculateVisibleWindow =(top: number, bottom: number, height: number)=> {
        // return (top + listHeight > scrollTop ) && (bottom - (listHeight * 2) - height >= scrollTop)
        // return (top + listHeight > scrollTop )
        return (top + listHeight > scrollTop ) && (bottom - height >= scrollTop)
    }

    const splitArray = useMemo(() => {
        let nodes = new Llist();
        let subArr: any[] = []
        let count = 0
        console.log('rer')

        let summaryTop = 0
        let summaryBottom = heightRow * data.length
        let height = 0

        for (let i = 0; i < data.length; i++) {
            height = i === 0 ? heightRow: heightRow + (heightRow * i)
            if (subArr.length + 1 === maxRowRender) {
                // const height = listHeight + heightRow * count
                let top = i === maxRowRender - 1  ? 0 : summaryTop + listHeight
                summaryTop = summaryTop + listHeight
                let bottom = top + height
                const isVisible = getCalculateVisibleWindow(top, summaryBottom, height)
                nodes.push({dataList: subArr, height, count: ++count, top, bottom, summaryBottom, isVisible })
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


    const getSplitArray = useCallback((data: string | any[], listHeight: number, maxRowRender: number, scrollTop: any) => {
        let nodes = new Llist();
        let subArr: any[] = []
        let count = 0
        let summaryTop = 0
        let summaryBottom = heightRow * data.length
        let height = 0

        for (let i = 0; i < data.length; i++) {
            height = i === 0 ? heightRow: heightRow + (heightRow * i)
            if (subArr.length + 1 === maxRowRender) {
                // const height = listHeight + heightRow * count
                let top = i === maxRowRender - 1  ? 0 : summaryTop + listHeight
                summaryTop = summaryTop + listHeight
                let bottom = top + height
                const isVisible = getCalculateVisibleWindow(top, summaryBottom, height)
                nodes.push({dataList: subArr, height, count: ++count, top, bottom, summaryBottom, isVisible })
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
        // @ts-ignore
        setNodeArray(nodes.toArray())
        // return nodes
    },[])

    const containerRef = useRef<HTMLDivElement>(null)
    const temporaryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const containerHeight = parseInt(String(containerRef.current.clientHeight), 10)
            setListHeight(containerHeight)
        }

    },[containerRef])

    useEffect(() => {
        getSplitArray(data,listHeight, maxRowRender, scrollTop)
    }, [getSplitArray, data,listHeight, maxRowRender, scrollTop])

    const handleScroll = (event: any) => {
        const scrollTop = event.target.scrollTop;
        setScrollTop(scrollTop)

        // console.log('test')
    }

    useEffect(() => {
        if (temporaryRef.current) {
            setHeightRow(temporaryRef.current.offsetHeight)
        }
    },[temporaryRef])

    console.log('scrollTop', scrollTop, listHeight, maxRowRender, splitArray, splitArray.toArray())
    console.log('tes', nodeArray, !!nodeArray)

    // if (!nodeArray) return null

    return (
        <div className="container" ref={containerRef} onScroll={handleScroll}>
              {/*{list.map((elm: any) => (*/}
              {/*    <div className="element" key={elm}>{elm}</div>*/}
              {/*))}*/}

            {/*{splitArray.toArray().map((elm: any) => (*/}
            {/*    <div className="element" key={elm}>{elm.height}</div>*/}
            {/*))}*/}

            <div className="emptyList">
                <div className="element" ref={temporaryRef}>elm</div>
            </div>

            {/*{splitArray.toArray().map((list: any) => (*/}
            {/*    <div key={list.count}>*/}
            {/*        {list.isVisible && list.dataList.map((elm: any) => (*/}
            {/*            <div className="element" key={elm}>{elm}</div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*))}*/}

            {nodeArray.map((list: any) => (
                <div key={list.count}>
                    {list.isVisible && list.dataList.map((elm: any) => (
                        <div className="element" key={elm}>{elm}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}
