enum RadioMessage {
    message1 = 49434
}
function Configure_variables () {
    time = 0
    Hyro_Nº = randint(0, 100)
    time = 0
}
function Microturtle_configuration () {
    turtle.pen(TurtlePenMode.Up)
    turtle.setBrightness(255)
    turtle.home()
    turtle.setSpeed(25.5)
    turtle.setPosition(0, 0)
}
function Configures () {
    Configure_radio_frequency()
    Serial_configuration()
    Datalogger_configuration()
    Microturtle_configuration()
    Configure_variables()
}
function Configure_radio_frequency () {
    radio.setGroup(1e+99)
    radio.setTransmitPower(17.4)
    radio.setTransmitSerialNumber(true)
    radio.setFrequencyBand(17.4)
    radio.raiseEvent(
    EventBusSource.MICROBIT_ID_RADIO,
    EventBusValue.MES_ALERT_EVT_VIBRATE
    )
}
function Serial_configuration () {
    serial.redirect(
    SerialPin.USB_TX,
    SerialPin.USB_RX,
    BaudRate.BaudRate115200
    )
    serial.setTxBufferSize(32)
    serial.setRxBufferSize(32)
    serial.writeBuffer(serial.readBuffer(0))
    serial.setWriteLinePadding(0)
    serial.setBaudRate(BaudRate.BaudRate115200)
    serial.writeLine("º - º - º - º - º - º - º - º - º - º - º - º - º")
    serial.redirectToUSB()
}
function Datalogger_configuration () {
    datalogger.includeTimestamp(FlashLogTimeStampFormat.Hours)
    datalogger.setColumnTitles(
    "time",
    "Hyro",
    "ºC",
    "time event"
    )
}
let Hyro_Nº = 0
let time = 0
Configures()
basic.forever(function () {
    turtle.forward(1)
    turtle.setPosition(1, 0)
    turtle.forward(1)
    turtle.setPosition(2, 0)
    turtle.forward(1)
    turtle.setPosition(3, 0)
    turtle.forward(1)
    turtle.setPosition(4, 0)
    turtle.forward(1)
    turtle.setPosition(0, 1)
    turtle.forward(1)
    turtle.setPosition(1, 1)
    turtle.forward(1)
    turtle.setPosition(2, 1)
    turtle.forward(1)
    turtle.setPosition(4, 1)
    turtle.forward(1)
    turtle.setPosition(1, 2)
    turtle.forward(1)
    turtle.setPosition(2, 2)
    turtle.forward(1)
    turtle.setPosition(3, 2)
    turtle.forward(1)
    turtle.setPosition(4, 2)
    turtle.forward(1)
    turtle.setPosition(0, 3)
    turtle.forward(1)
    turtle.setPosition(1, 3)
    turtle.forward(1)
    turtle.setPosition(2, 3)
    turtle.forward(1)
    turtle.setPosition(4, 3)
    turtle.forward(1)
    turtle.setPosition(1, 4)
    turtle.forward(1)
    turtle.setPosition(2, 4)
    turtle.forward(1)
    turtle.setPosition(3, 4)
    turtle.forward(1)
    turtle.setPosition(4, 4)
})
loops.everyInterval(86400000, function () {
    datalogger.log(
    datalogger.createCV("time", "" + time + "s"),
    datalogger.createCV("ºC", input.temperature()),
    datalogger.createCV("Hyro", "" + Hyro_Nº + "%"),
    datalogger.createCV("time event", control.eventTimestamp())
    )
    serial.writeValue("time", time)
    serial.writeValue("ºC", input.temperature())
    serial.writeValue("Hyro", Hyro_Nº)
    serial.writeValue("time event", control.eventTimestamp())
    radio.sendValue("Time", time)
    radio.sendValue("ºC", input.temperature())
    radio.sendValue("Hyro", Hyro_Nº)
    radio.sendValue("Hyro", control.eventTimestamp())
})
loops.everyInterval(1000, function () {
    time += 1
})
