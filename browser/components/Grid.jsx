import React from 'react'
import THREE from 'three'
import { Mesh, Object3D } from '../../js/react-threejs/src'
// http://threejs.org/examples/#webgl_geometry_dynamic
export default class Grid extends React.Component {
   constructor (...args) {
    super(...args)
    this.geometry = new THREE.PlaneBufferGeometry(500,500,1,1);
    
    // const material = this.material = new THREE.MeshBasicMaterial( { color: 0x0044ff, wireframe: true} );
    this.material = new THREE.ShaderMaterial( {
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() }
    },
    vertexShader: `varying vec4 pos; varying vec2 vuv;
    void main() {
      gl_Position = pos = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      vuv = uv;
    }`
  ,
    fragmentShader: `varying vec4 pos; varying vec2 vuv;
    void main() {
      vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
      if (abs(mod(vuv.x * 1000.0, 20.0)) < 1.0) {
        color.r = vuv.x;
        color.b = 1.0;
      }
      if (abs(mod(vuv.y * 1000.0, 20.0)) < 1.0) { 
        color.g = vuv.y;
        color.b = 1.0;
      }
      gl_FragColor = color;
    }`
      } );
    
  }
  
  addObject = (evt, hit, ) => {
    console.log('in Grid addObject hit:', hit)
    const points = hit.point
    const brushData = this.props.sampleBrush  
    // console.log('BRUSHDATA------', this.props)
    
    if (brushData){
      console.log('YESSSS_______')
      const data = {
            position: {x: points.x, y: points.y, z: 0.5},
            spl: brushData.spl,
            obj: brushData.obj,
            filter: null, 
            time: Math.round((points.x + 250)/3)
          }
      this.props.addObject(data);
    }
    
  }
  
  render () {
    const { material,geometry } = this
    console.log("PROPS IN GRID", this.props);
    return (
      <Mesh onMouseDown={this.addObject} geometry={geometry} material={material}/>
    )
  }
}