// Thanks @Unlearn for fixing bug where too much 
// memory resources were being used by the widget

// for use in scriptable
// based on: https://github.com/ferraridavide/scriptable/blob/main/days-left.js

const BG_COLOR = "#223433";

const widget = new ListWidget();
widget.backgroundColor = new Color("#000000");
// These are optimized for iPhone 15 Pro. You may need to adjust for different devices.
// Increase values for larger screens, decrease for smaller screens.
const PADDING = 8;           // Space around the edges of the widget
const CIRCLE_SIZE = 6;       // Size of the progress dots
const CIRCLE_SPACING = 4;    // Space between dots
const TEXT_SPACING = 8;      // Space between dot grid and text
const DOT_SHIFT_LEFT = 2;
const YEAR_OFFSET = DOT_SHIFT_LEFT - 2;
const DAYS_LEFT_OFFSET = 0;

const WIDGET_WIDTH = 320;
const AVAILABLE_WIDTH = WIDGET_WIDTH - (2 * PADDING);
const TOTAL_CIRCLE_WIDTH = CIRCLE_SIZE + CIRCLE_SPACING;
const COLUMNS = Math.floor(AVAILABLE_WIDTH / TOTAL_CIRCLE_WIDTH);
const ROWS = Math.ceil(DAYS_TOTAL / COLUMNS);

const COLOR_FILLED = new Color("#ffffff");
const COLOR_UNFILLED = new Color("#ffffff", 0.4);
const COLOR_CURRENT_DAY = COLOR_FILLED;

const NOW = new Date();
const CURRENT_YEAR = NOW.getFullYear();
const START_OF_YEAR = new Date(CURRENT_YEAR, 0, 1);
const DAY_OF_YEAR = Math.floor((NOW - START_OF_YEAR) / 86400000) + 1;
const IS_LEAP_YEAR = CURRENT_YEAR % 4 === 0 && (CURRENT_YEAR % 100 !== 0 || CURRENT_YEAR % 400 === 0);
const DAYS_IN_YEAR = IS_LEAP_YEAR ? 366 : 365;

widget.setPadding(12, PADDING, 12, PADDING);

const gridStack = widget.addStack();
gridStack.layoutVertically();
gridStack.spacing = CIRCLE_SPACING;

const circleFont = Font.systemFont(CIRCLE_SIZE);

for (let row = 0; row < ROWS; row++) {
  const rowStack = gridStack.addStack();
  rowStack.layoutHorizontally();
  rowStack.spacing = CIRCLE_SPACING;

  for (let col = 0; col < COLUMNS; col++) {
    const day = row * COLUMNS + col + 1;
    if (day > DAYS_IN_YEAR);

    const circleText = rowStack.addText("●");
    circleText.font = circleFont;
    circleText.lineLimit = 1;
    circleText.textColor = day <= DAY_OF_YEAR ? COLOR_FILLED : day > DAYS_IN_YEAR ? BG_COLOR : COLOR_UNFILLED;
  }
}

widget.addSpacer(TEXT_SPACING);

widget.addSpacer(20)
const font = new Font("Menlo", 14)
const textRow = widget.addStack();
textRow.spacing = 10;
textRow.layoutHorizontally();

const yearText = textRow.addText(CURRENT_YEAR.toString())
yearText.font = font
textRow.addSpacer()

const daysLeftGroup = textRow.addStack()
daysLeftGroup.layoutHorizontally()

const nDaysLeft = daysLeftGroup.addText((365-DAY_OF_YEAR).toString())
nDaysLeft.font = font

const daysLeft = daysLeftGroup.addText(" days left")
daysLeft.font = font
daysLeft.textColor = new Color("#ffffff", 0.4)


if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentLarge();
}
Script.complete();

//