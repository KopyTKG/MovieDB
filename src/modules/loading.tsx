export default function Loading({useRef}: any) {
    return (
        <div id="Loading" className="circle" ref={useRef}>
          <div className="outter-circle">
          <div className="inner-circle"/>
          </div>
        </div>
    )
}