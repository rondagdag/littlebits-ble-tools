class CarControlView extends React.Component {
    render() {
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
                value={this.props.connectionStates.Left.currentValue || 0}
                onChange={(evt) => this.props.connectionActions.Left.writeValue(evt.target.value)}
            />
			<input
                type="range" min="0" max="255"
                value={this.props.connectionStates.Right.currentValue || 0}
                onChange={(evt) => this.props.connectionActions.Right.writeValue(evt.target.value)}
            />
        </div>;
    }
}

const CarControlWrapperView = BLEAdaptor(BLEAdaptor(CarControlView, "Left"), "Right");
