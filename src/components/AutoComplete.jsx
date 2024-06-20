import { useEffect, useState } from "react";

const AutoComplete = () => {
  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [filteruser, setFilteruser] = useState([]);

  const handleOnchange = (e) => {
    const query = e.target.value.toLowerCase();
    console.log(`input -> `, query);
    if (query) {
      const filterdata = userdata
        ? userdata.filter((userItem) => {
            return userItem.firstName.toLowerCase() == query.toLowerCase();
          })
        : [];
      console.log(`filter data -> `, filterdata);
      setFilteruser(filterdata);
    } else {
      null;
    }
  };

  const getusers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://dummyjson.com/users");
      const data = await response.json();
      if (data && data.users && data.users.length) {
        setUserdata(data.users);
        setLoading(false);
      }
      console.log(userdata);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getusers();
  }, []);
  if (loading) {
    return <p>Please wait ! Data Fetching...</p>;
  }
  return (
    <div>
      <div className="input-sec">
        <input
          type="text"
          name=""
          placeholder="Enter users hare ..."
          onChange={handleOnchange}
        />
      </div>
      <div className="show-content">
        {filteruser && filteruser.length
          ? filteruser.map((item , index) => {
              return <div className="content-box" key={index}>
                <p>FirstName = {item.firstName}</p>
                <p>LastName = {item.lastName}</p>
                <p>MaidenName = {item.maidenName}</p>
                <p>Age = {item.age}</p>
              </div>;
            })
          : null}
      </div>
    </div>
  );
};

export default AutoComplete;
