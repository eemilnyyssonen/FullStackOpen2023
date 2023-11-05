const Notification = ({ message, errorFlag }) => {
    if (message === null) {
      return null
    }

    const notificationStyle = {
        color: errorFlag ? 'red'  : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  export default Notification