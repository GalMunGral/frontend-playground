---
path: /github/cse6730-peachtree-traffic
---
# Process-oriented Traffic Simulation
*CX 4230: Computer Simulation, CSE/ECE 6730: Modeling and Simulation: Fundamentals & Implementation*

- `run.py`: Run simulation for all &alpha; values.

- `stats.py`: Generate confidence intervals from obtained data.

##  Model Description
The process-oriented simulation simulates the northbound traffic by representing vehicles as individual
threads that go through the same sequence of arrivals and departures at the consecutive intersections. As
with the event-driven simulation, the road is divided into three sections, where the segment from 12th St to
14th St is modeled as one section. Each section has two lanes, each of which is represented by a queue data
structure that holds vehicle thread objects in their arrival order.

The simulation advances through its underlying event scheduling and processing. The stream of incoming
vehicles is created by recursively scheduling vehicle arrival events, each of which spawns a new vehicle thread
and then schedules the creation of next vehicle at an inter-arrival time generated from the same cumulative
distribution function used in the other two simulations. For easier comparison with the other two models, a
further assumption is made that the traffic entering Peachtree St. at each intermediate intersection exactly
compensates for the traffic leaving Peachstree St. at that intersection. Under this assumption, traffic density
is only affected by the inflow at the 10th St. intersection, therefore vehicles are only generated at the 10th
St intersection. The vehicles are then moved forward by the traffic light events.

Various simplifying assumption are made for the traffic light events. First of all, all traffic lights are
completely synchronized – that is, they are all green or red at the exact same simulation time. Secondly,
each light switching event schedules the next at a constant 45 second interval, which number is a simplification
made from the NGSIM data. When a traffic light turns green, the first 10 vehicles in each corresponding
lane (queue) are notified through their respective condition variables.

When notified, each vehicle thread resumes execution and schedules its own arrival at the next intersection.
Since each vehicle thread schedules
its own arrival events independently of the scheduler thread, a barrier synchronization is used to ensure
that asynchronously generated events never arrive in the simulation’s past, which would violate the causality
constraint. Specifically, immediately after processing a scheduled event, the event processing loop waits until
all notified threads, if there are any, to either exit or be suspended by the operating system by invoking `some_cv.wait()`.
This design is chosen because it is easier to implement and therefore less error-prone compared to a rollback mechanism.

## Event Loop Implementation
```python
'''
PSEUDOCODE FOR EVENT LOOP WITHOUT SYNCHRONIZATION:
  while (simulation not finished)
    E := smallest time stamp event in FEL
    Remove E from FEL
    Now := time stamp of E
    Call event handler procedure
'''

while not self.event_list.empty():
    # PROCESS NEXT EVENT
    next_event = self.event_list.get()
    self.time = next_event.time
    next_event.f()    
    # BARRIER SYNCHRONIZATION
    with self.cv:
        while len(self.notified_threads) > 0:
            self.cv.wait()
```
