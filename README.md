# power-data-overlay

[Available here](https://snemvalts.github.io/power-data-overlay/)

This is a PoC React implementation of [DashWare](https://dashware.software.informer.com/), an app for adding speed, heart rate, cycling power and cadence overlays to action camera footage.

It works by parsing the .FIT file, extracting speed and power data, and using [Etro](https://etrojs.dev/) to render a green screen with the data overlaid. 
The video can be previewed, rendered, and then imported into a video editor, and the green set as the transparency color.

The rendering itself is extremely slow, small files <1min are recommended.  
[File can be trimmed with FIT file tools](https://www.fitfiletools.com/#/remover#view). 

It can be quite buggy as well, only tested with Garmin files with 1s recording interval. As rendering is so slow, there's no point to develop it further.
