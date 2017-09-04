class SliderControlView extends React.Component {
    render() {
        return <div>
            <PairingView
                actions={this.props.connectionActions.Primary}
                defaultValue={128}
                state={this.props.connectionStates.Primary}
                label="Primary"
            />

			<input
                type="range"
                min="0"
                max="255"
                value={this.props.connectionStates.Primary.currentValue || 0}
                onChange={(evt) => this.props.connectionActions.Primary.writeValue(evt.target.value)}
            />
        </div>;
    }
}

const SliderControlWrapperView = BLEAdaptor(SliderControlView, "Primary");
