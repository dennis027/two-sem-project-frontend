var studentDetails = [
    { id: 1, studentName: 'Sathish', gender: 'Male', age: 15 },
    { id: 2, studentName: 'kumar', gender: 'Male', age: 16 },
    { id: 3, studentName: 'Roja', gender: 'Female', age: 15 },
    {id: 4, studentName: 'Nayanthara', gender: 'Female', age: 16},
  ];
  
  var studentMark = [
    { testimony_id: 1, mark1: 180, mark2: 90, mark3: 100 },
    { testimony_id: 2, mark1: 80, mark2: 190, mark3: 100 },
    { testimony_id: 3, mark1: 80, mark2: 90, mark3: 1100 },
    { testimony_id: 4, mark1: 80, mark2: 9011, mark3: 100 },
  ];



  var mergeById = (array1, array2) =>
  array1.map(itm => ({
    ...array2.find((item) => (item.question_id === itm.id) && item),
    ...itm
  }));


  var mergediag = (array1, array2) =>
  array1.map(itm => ({
    ...array2.find((item) => (item.diagnosis_id === itm.id) && item),
    ...itm
  }));

  var mergeByTesti = (array1, array2) =>
  array1.map(itm => ({
    ...array2.find((item) => (item.testimony_id === itm.id) && item),
    ...itm
  }));

  
    var result = mergeByTesti(studentDetails, studentMark);   

    console.log(result)  

    // wanja

    window.onload = function() { 
      // console.log("hahhaha")
      // this.snav.toggle()
     
    }
  