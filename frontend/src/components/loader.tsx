// const Loader = () => {
//     return (
//         <div className="lds-ellipsis">
//             <div></div><div></div><div></div><div></div>
//         </div>
//     );
// };
//
// export default Loader;

interface LoaderProps {
    size?: number; // default 80
}

const Loader = ({ size = 80 }: LoaderProps) => {
    const circleSize = size / 6; // proportional scaling
    const top = size / 2.4;      // keeps it centered

    return (
        <div
            className="lds-ellipsis"
            style={{ width: size, height: size }}
        >
            <div style={{ width: circleSize, height: circleSize, top }}></div>
            <div style={{ width: circleSize, height: circleSize, top }}></div>
            <div style={{ width: circleSize, height: circleSize, top }}></div>
            <div style={{ width: circleSize, height: circleSize, top }}></div>
        </div>
    );
};

export default Loader;

