let studentDetails = [
    { id: 1, studentName: 'Sathish', gender: 'Male', age: 15 },
    { id: 2, studentName: 'kumar', gender: 'Male', age: 16 },
    { id: 3, studentName: 'Roja', gender: 'Female', age: 15 },
    {id: 4, studentName: 'Nayanthara', gender: 'Female', age: 16},
  ];
  
  let studentMark = [
    { question_id: 1, mark1: 180, mark2: 90, mark3: 100 },
    { question_id: 2, mark1: 80, mark2: 190, mark3: 100 },
    { question_id: 3, mark1: 80, mark2: 90, mark3: 1100 },
    { question_id: 4, mark1: 80, mark2: 9011, mark3: 100 },
  ];

  const mergeById = (array1, array2) =>
  array1.map(itm => ({
    ...array2.find((item) => (item.question_id === itm.id) && item),
    ...itm
  }));
    let result = mergeById(studentDetails, studentMark);   

    console.log(result)