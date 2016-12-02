import React from 'react';
import { Object3D } from '../../js/react-threejs/src';
import Cube from './Cube';
import TorusSmall from './TorusSmall';
import TorusLarge from './TorusLarge';
import Cylinder from './Cylinder';
import Dodecahedron from './Dodecahedron';
import Sphere from './Sphere'
import Tube from './Tube'
import TorusKnot from './TorusKnot'
import Icosahedron from './Icosahedron'
import componentFor from './timeline-components'

export default class RenderObjects extends Object3D {
  constructor (...args) {
    super(...args)
    this.animate = ::this.animate
    this.state = {
      rotation: { x: 0, y: 0 },
      panGesture: null,
      camera: {
        position: {x: 0, y: 0, z: 100}
      },
    }
  }

  componentDidMount (...args) {
    super.componentDidMount(...args)
    this.animate()
  }

  animate () {
    requestAnimationFrame(this.animate)
    const { rotation } = this.state
    this.setState({
      rotation: {
        x: rotation.x + 0.1,
        y: rotation.y + 0.1,
      },
    });
  }

  onMouseDown = (timelineEvt) => (evt, hit) => {
    // alert(
    //   "Key Pressed: " + String.fromCharCode(evt.charCode) + "\n"
    //   + "charCode: " + evt.charCode + "\n"
    //   + "SHIFT key pressed: " + evt.shiftKey + "\n"
    //   + "ALT key pressed: " + evt.altKey + "\n"
    // );
    if (evt.buttons === 1 && this.props.filterBrush) {  
      this.props.addFilter(timelineEvt.id, this.props.filterBrush.type) 
    }           
  
    if (evt.buttons === 2) {
      this.props.deleteObj(timelineEvt.id)
    }
  }

  onDragStart = (timelineEvt) => (evt, hit) => {
    console.log('ONDRAGSTART', timelineEvt)
    if (evt.buttons === 1 && evt.shiftKey) {
      return timelineEvt;
    }
  }
  render () {
    //renders an array of object 

    return (
      <div>
        {
          this.props.events && this.props.events.map((event, idx) => {
            const TimelineEventComponent = componentFor(event.obj)
            console.log('TIMELINE EVENT COMPONENT', event.obj)
            if (!TimelineEventComponent) return
            if (TimelineEventComponent) {
              return <TimelineEventComponent
              key={event.id}
              onMouseDown={this.onMouseDown(event)}
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
          }
          

        }
        
        )
      }
      </div>
    )
  }
}


// the number 2: 0 0 0 0 0 0 1 1
// the number 2: 0 0 0 0 0 0 1 0
// 1 & 2       : 0 0 0 0 0 0 1 0

// test shapes
//         <Tube position={{x: 0, y: -5, z: 0}} />
//         <TorusLarge position={{x: -50, y: 10, z: 0}} />
//         <TorusKnot rotation={rotation} position={{x: 0, y: -5, z: 0}} />
//         <Icosahedron rotation={rotation} position={{x: -50, y: -30, z: 0}} />
//         <Sphere rotation={rotation} position={{x: -100, y: -30, z: 10}} />
