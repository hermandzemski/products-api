const ProductSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      price: { type: 'number' },
      title: { type: 'string' },
      description: { type: 'string' }
    },
    required: ['id', 'price', 'title'],
  };