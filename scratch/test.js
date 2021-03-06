<View style={{}}>
  <Icon style={{}} name="ios-search" size={20} color="#000" />
  <TextInput
    style={{}}
    placeholder="Search Product ..."
    onChangeText={(searchString) => {
      setSearchText(searchString);
    }}
    underlineColorAndroid="transparent"
  />
</View>

searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
},
searchIcon: {
    padding: 10,
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
},