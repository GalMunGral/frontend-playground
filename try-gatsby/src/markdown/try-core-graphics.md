---
path: /github/try-core-graphics
---
Based on [this tutorial](https://www.raywenderlich.com/1101-core-graphics-on-macos-tutorial). All graphics code is under `DiskInfo/GraphView.swift`.  
#### Main changes in Swift 5:
- `NS<AttributeType>AttributeName` becomes `NSAttributedString.Key.<attributeType>`
- `NSRectFill` is now a method of `CGRect`/`NSRect`, i.e. `NSRectFill(bound)` should be `bound.fill()`
- `NSGraphicsContext.current` is now a class property instead of method, i.e. `.current` instead of `.current()`

![screenshot](screenshot.png)
