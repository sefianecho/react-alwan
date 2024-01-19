# react-alwan

A simple, lightweight, customizable, touch friendly color picker for react library.

&nbsp;&nbsp;&nbsp;

<div align="center">
  <img alt="alwan light theme" src="https://github.com/SofianChouaib/react-alwan/blob/main/images/alwan-light.png?raw=true">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

  <img alt="alwan dark theme" src="https://github.com/SofianChouaib/react-alwan/blob/main/images/alwan-dark.png?raw=true">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</div>

&nbsp;&nbsp;&nbsp;

## Features

-   Touch friendly.
-   Support dark theme.
-   Alpha channel (opacity).
-   Support 3 color formats hsl, rgb and hex.
-   Keyboard accessible.
-   Simple easy to use interface (inspired by google chrome's color picker).
-   No dependencies.
-   Copy color to the clipboard.
-   Lightweight.

## Demo

[Click here to try it](https://sofianchouaib.github.io/react-alwan/)

## Getting started

### Install using package manager

```shell
npm install react-alwan
```

or

```
yarn add react-alwan
```

### Direct Link

-   Jsdelivr CDN

```html
<!-- Style -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-alwan/dist/alwan.css" />

<!-- Script -->
<script src="https://cdn.jsdelivr.net/npm/react-alwan/dist/umd/react-alwan.js"></script>
```

-   Unpkg CDN

```html
<!-- Style -->
<link rel="stylesheet" href="https://unpkg.com/react-alwan/dist/alwan.css" />

<!-- Script -->
<script src="https://unpkg.com/react-alwan/dist/umd/react-alwan.js"></script>
```

## Usage

```javascript
// Import javascript.
import Alwan from 'react-alwan';
// Import css.
import 'react-alwan/dist/alwan.css';

function App() {
    return (
        <>
            <Alwan />
        </>
    );
}
```

## Props

-   `id` (_default_ `''`) — Set the color picker Id.
-   `classname` (_default_ `''`) — Add classes to the reference button.
-   `theme` (_default_ `light`) — Choose a theme, 'dark' or 'light'.
-   `toggle` (_default_ `true`) — Toggle picker's visibility (Show/Hide), Setting this to false keeps the picker visible.
-   `popover` (_default_ `true`) — Display the picker container as a pop-up (a box that floats on top of the page content), if it's false, picker container will be displayed as a block (embedded in the page's content).
-   `position` (_default_ `bottom-start`) — Set the position of the popper (if popover is set to true) relative to the reference element, the position has two values separated by a dash (-), the first value is the direction (top, bottom, right, left), the second value is the alignment (start, center, end), omitting this value will default to center.

    e.g. 'bottom-start': 'bottom' places the picker below the reference element, and 'start' aligns the left side of the container with the left side of the reference element.

    Note:
    If the picker container has no space to be placed, it will auto-position itself.
    based on the available space.

-   `margin` (_default_ `0`) — Set the gap (in pixels) between the picker container and the reference element.
-   `preview` (_default_ `true`) — Preview the color.
-   `copy` (_default_ `true`) — Add/Remove a copy button.
-   `opacity` (_default_ `true`) — Support alpha channel and display opacity slider.
-   `disabled` (_default_ `false`) — Disable the picker, users won't be able to pick colors.
-   `value` (_default_ `#000`) — Color picker value.
-   `singleInput` (_default_ `false`) — For the formats 'hsl' and 'rgb', choose a single input to display the color string, or if false, display an input for each color component.
-   `inputs` (_default_ `true`) — Input(s) field(s) for each color format. if this option is set to true then all formats are selected.
-   `format` (_default_ `rgb`) — Initial color format.
-   `swatches` (_default_ `[]`) — Array of color swatches, invalid values will be displayed as rgb(0, 0, 0).
-   `toggleSwatches` (_default_ `false`) — Make swatches container collapsible.
-   `closeOnScroll` (_default_ `false`) — Close the color picker when scrolling.
-   `onChange` (_default_ `undefined`) — On Change event fires whenever the color changes.
-   `onOpen` (_default_ `undefined`) — On Open event fires whenever the color picker opens.
-   `onClose` (_default_ `undefined`) — On Change event fired whenever the color picker closes.

## Accessibility (v1.1)

Unlabeled interactive elements has a ARIA label attribute with a default values in english. You can change these labels in the options by modifying the i18n object prop.
```javascript
  i18n: {
    palette: 'Color picker', // Label for the color picking area.
    copy: 'Copy color to clipboard', // Label & title for the copy button.
    changeFormat: 'Change color format', // Label & title for the change format button.
    swatch: 'Color swatch', // Label for swatch buttons.
    toggleSwatches: 'Toggle swatches', // Label & title for the toggle swatches button.
    hue: 'Change hue', // Label for the hue slider.
    alpha: 'Change opacity' // Label for the opacity slider.
}
```
## Events

```javascript
    <Alwan
        onOpen={(ev) => { /* ... */ }}
        onClose={(ev) => { /* ... */ }}
        onChange={(ev) => {
            ev.type // Event type `change`, `open` or `close`.

            // HSL color components.
            ev.h // Hue.
            ev.s // Saturation.
            ev.l // Lightness.

            // RGB color components.
            ev.r // Red.
            ev.g // Green.
            ev.b // Blue.

            ev.a // Alpha (opacity)

            // Color string values.
            ev.hex // Hex value.
            ev.rgb // RGB string.
            ev.hsl // HSL string.
        }}
    >

```
