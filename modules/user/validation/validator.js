const yup = require("yup");

const createUserSchema = yup.object({
  body : yup.object({
    name: yup.string().required("please enter valid name"),
    username: yup.string().required("please enter valid username"),
    password: yup.string().required("please enter strong password"),
    address: yup.string(),      
    phone: yup.string(),
    filename: yup.string(),
  }),
});

const updataUserSchema = yup.object({
  body : yup.object({
    name: yup.string().optional(),
    username: yup.string().optional(),
    password: yup.string().optional(),
    address: yup.string().optional(),      
    phone: yup.string().optional(),
    filename: yup.string().optional(),
  })
})
const isValidIdSchema = yup.object({
  params: yup.object({
      id: yup.string().uuid('Invalid Id').required('Id is required'),
  })
});
  
const getUserSchema = yup.object({
  params: yup.object({
      page: yup.number().integer().test('is-number', 'page Number must be a number', (value) => !isNaN(value)).min(1, "page Number must be greater than or equals 1").default(1),
      perPage: yup.number().integer().test('is-number', 'pageSize must be a number', (value) => !isNaN(value)).min(1, "page Size must be greater than or equals 1").default(5),
  })
})

module.exports = { createUserSchema, updataUserSchema, isValidIdSchema, getUserSchema};
