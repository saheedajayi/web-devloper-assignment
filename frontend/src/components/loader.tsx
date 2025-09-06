interface LoaderProps {
    size?: number;
}

const Loader = ({ size = 80 }: LoaderProps) => {
    const circleSize = size / 6;
    const top = size / 2.4;

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

