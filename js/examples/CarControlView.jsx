function coordToWheels(x, y) {
    const scaleLeft = Math.min(x / 128, 1);
    const scaleRight = Math.min(2 - (x / 128), 1);
    const invY = 255 - y;
    return [
        // Left
        Math.min(Math.max(invY * scaleLeft + (1.0 - scaleLeft) * 128, 0), 255),
        // Right
        Math.min(Math.max(y * scaleRight + (1.0 - scaleRight) * 128, 0), 255)
    ];
}

class CarControlView extends React.Component {
    constructor(props) {
        super(props);
        this.drag = null;
        this.state = {
            posX: 128,
            posY: 128,
        };
    }

    componentDidMount() {
        this._orientationHandler = this.handleOrientationChange.bind(this);
        window.addEventListener("deviceorientation", this._orientationHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("deviceorientation", this._orientationHandler);
    }

    handleOrientationChange(evt) {
        if (!this.drag) {
            const newX = Math.round(evt.gamma * (256.0/90.0) + 128);
            const newY = Math.round((evt.beta - 45) * (255.0/90.0) + 128);

            const [newLeft, newRight] = coordToWheels(newX, newY);
            this.props.connectionActions.Left.writeValue(newLeft);
            this.props.connectionActions.Right.writeValue(newRight);

            this.setState({
                posX: newX,
                posY: newY
            });
        }
    }

    handleCircleDown(evt) {
        if (evt.touches !== undefined) {
            if (evt.touches.length !== 1) {
                return;
            }
            this.drag = {
                origX: evt.touches[0].clientX,
                origY: evt.touches[0].clientY,
            };
        } else {
            this.drag = {
                origX: evt.clientX,
                origY: evt.clientY,
            };
        }
        evt.preventDefault();
        evt.stopPropagation();
    }

    handleCircleMove(evt) {
        if (this.drag) {
            let dx = 0;
            let dy = 0;
            if (evt.touches !== undefined) {
                dx = evt.touches[0].clientX - this.drag.origX;
                dy = evt.touches[0].clientY - this.drag.origY;
                this.drag = {
                    origX: evt.touches[0].clientX,
                    origY: evt.touches[0].clientY,
                };
            } else {
                dx = evt.clientX - this.drag.origX;
                dy = evt.clientY - this.drag.origY;
                this.drag = {
                    origX: evt.clientX,
                    origY: evt.clientY,
                };
            }

            let newX = this.state.posX + (dx / 300.0) * 295;
            let newY = this.state.posY + (dy / 300.0) * 295;
            if (newX < 0) { newX = 0; }
            if (newX > 255) { newX = 255; }
            if (newY < 0) { newY = 0; }
            if (newY > 255) { newY = 255; }

            const [newLeft, newRight] = coordToWheels(newX, newY);
            this.props.connectionActions.Left.writeValue(newLeft);
            this.props.connectionActions.Right.writeValue(newRight);

            this.setState({
                posX: newX,
                posY: newY
            });
        }
        evt.preventDefault();
        evt.stopPropagation();
    }

    handleCircleUp(evt) {
        this.drag = null;
        evt.preventDefault();
        evt.stopPropagation();
    }

    render() {
        const left = this.props.connectionStates.Left.currentValue || 0;
        const right = this.props.connectionStates.Right.currentValue || 0;

        return <div>
            <PairingView
                actions={this.props.connectionActions.Left}
                defaultValue={128}
                state={this.props.connectionStates.Left}
                label="Left wheel"
            />
            <PairingView
                actions={this.props.connectionActions.Right}
                defaultValue={128}
                state={this.props.connectionStates.Right}
                label="Right wheel"
            />

			<input
                type="range" min="0" max="255"
                value={left}
                onChange={(evt) => this.props.connectionActions.Left.writeValue(evt.target.value)}
            />
			<input
                type="range" min="0" max="255"
                value={right}
                onChange={(evt) => this.props.connectionActions.Right.writeValue(evt.target.value)}
            />

            <svg
                width="300"
                height="300"
                viewBox="-20 -20 295 295"
                onMouseLeave={this.handleCircleUp.bind(this)}
                onMouseMove={this.handleCircleMove.bind(this)}
                onMouseUp={this.handleCircleUp.bind(this)}
                onTouchEnd={this.handleCircleUp.bind(this)}
                onTouchMove={this.handleCircleMove.bind(this)}
            >
                <circle cx={128} cy={128} r={128} fill="#ffffff" stroke="#c0c0c0" strokeWidth="1" />
                <circle cx={128} cy={128} r={64} fill="#ffffff" stroke="#c0c0c0" strokeWidth="1" />
                <circle cx={128} cy={128} r={32} fill="#ffffff" stroke="#c0c0c0" strokeWidth="1" />
                <circle cx={128} cy={128} r={16} fill="#ffffff" stroke="#c0c0c0" strokeWidth="1" />
                <line strokeDasharray="5, 5" x1={this.state.posX} y1={0} x2={this.state.posX} y2={295} stroke="#c06060" strokeWidth="1" />
                <line strokeDasharray="5, 5" x1={0} y1={this.state.posY} x2={295} y2={this.state.posY} stroke="#c06060" strokeWidth="1" />
                <circle
                    cx={this.state.posX}
                    cy={this.state.posY}
                    onMouseDown={this.handleCircleDown.bind(this)}
                    onTouchStart={this.handleCircleDown.bind(this)}
                    r={20}
                />
            </svg>
        </div>;
    }
}

const CarControlWrapperView = BLEAdaptor(BLEAdaptor(CarControlView, "Left"), "Right");
