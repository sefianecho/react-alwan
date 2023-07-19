const { ReactDOM, React, alwan } = window;

ReactDOM.createRoot(document.getElementById('root')).render(
    React.createElement(
        'div',
        null,
        React.createElement(
            'label',
            {
                htmlFor: 'alwan',
            },
            'Choose a color'
        ),
        React.createElement(alwan, {
            id: 'alwan',
            onChange(color) {
                console.log(color);
            },
        })
    )
);
