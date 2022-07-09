import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPE from "../../data/types.js";
import JobInfo from "./JobInfo.jsx";



const JobCard = ({ item, index, moveItem, status, props }) => {
  //ref allows us to imperatively modify a child
  const ref = useRef(null)

  const [, drop] = useDrop({
      accept: ITEM_TYPE,
      hover(item, monitor) {
      if (!ref.current) return;
  
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
          return;
      }
      //getBoundClientReact returned value is a DOMRect object which is the smallest rectangle which contains the entire element, including its padding and border-width. The left, top, right, bottom, x, y, width, and height properties describe the position and size of the overall rectangle in pixels. 
      const hoveredRect = ref.current.getBoundingClientReact();
      const hoverMiddleY = (hoveredRect.bottom-hoveredRect.top) / 2;
      //Returns the last recorded { x, y }client offset of the pointer while a drag operation is in progress. Returns nullif no item is being dragged.
      const mousePosition = monitor.getCliendOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      //Nothing happens if the grabbed item is less than 50% hovered over another item;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      //moving item from dragIndex to hoverIndex instead
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
  }
  });

  const [{ isDragging }, drag] = useDrag({
      type: ITEM_TYPE, 
      item: { ...item, index}, 
      collect: monitor => ({
          isDragging: monitor.isDragging()
      })
  })

  const [show, setShow] = useState(false)

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false)

  drag(drop(ref));
  return (
    <Fragment>
        <div
            ref={ref}
            style={{ opacity: isDragging ? 0: 1}}
            className={"item"}
            onClick={onOpen}
            >
            <div className={"color-bar"} style={{ backgroundColor: status.color }}/>
            <p className={"item-employer"}>{item.employer_name}</p>
            <p className={"item-title"}>{item.job_title}</p>
            <p className={"item-apply"}>{item.job_expiration}</p>
            </div>
            <JobInfo 
                item={item}
                onClose={onClose}
                show={show}
            />
    </Fragment>
)

}

export default JobCard;


