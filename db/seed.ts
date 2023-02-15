import { DynamoDBClient, BatchWriteItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

const region = process.env.AWS_DEFAULT_REGION || 'us-east-1'
const endpoint = process.env.AWS_ENDPOINT_URL || 'http://localhost:4566'

const dbClient = new DynamoDBClient({
  region,
  endpoint
})

const seed = async() => {
  await dbClient.send(new BatchWriteItemCommand({
    RequestItems: {
      directions: [{
        PutRequest: {
          Item: marshall({
            id: 1,
            text: 'Bring a large pot of lightly salted water to a boil. Add fettuccine and cook for 8 to 10 minutes or until al dente; drain.'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 2,
            text: 'Melt butter into cream in a large saucepan over low heat; add salt, pepper, and garlic salt. Increase the heat to medium; stir in grated Romano and Parmesan cheese until melted and sauce has thickened.'

          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 3,
            text: 'Add cooked pasta to sauce and toss until thoroughly coated; serve immediately.'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 4,
            text: 'Place steaks side by side in large casserole dish. Add orange juice, cider vinegar, and Worcestershire sauce. Marinate, uncovered, in the refrigerator for 45 minutes.'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 5,
            text: 'Preheat the oven to 425 degrees F (220 degrees C).'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 6,
            text: 'Remove casserole dish from refrigerator. Cover steaks with plastic wrap and let allow to come to room temperature, at least 15 minutes.'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 7,
            text: 'Place steaks on a clean work surface and generously rub with steak seasoning and black pepper.'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 8,
            text: 'Heat olive oil in a cast-iron skillet over high heat.'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 9,
            text: 'Cook steaks in the hot skillet until lightly browned on the bottom, 2 1/2 minutes. Flip and cook until browned on the other side and red in the center, about 2 minutes more. Transfer skillet with the steaks to the oven.'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 10,
            text: 'Bake in the preheated oven until steaks are firm and reddish-pink to lightly pink in the center, 8 to 10 minutes. An instant-read thermometer inserted into the center should read from 130 degrees F (54 degrees C) to 140 degrees F (60 degrees C).'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 11,
            text: 'Remove steaks from oven; season with salt. Let rest for 5 minutes before serving.'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 12,
            text: 'Preheat an oven to 350 degrees F (175 degrees C).'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 13,
            text: 'Toss the shrimp in a bowl with the olive oil, melted butter, garlic, salt, and pepper; set aside for 10 minutes. Arrange the shrimp in a circular pattern in a round casserole dish.'
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 14,
            text: 'Bake in the preheated oven until the shrimp are pink and cooked through, about 15 minutes.'
          })
        }
      }
      ]
    }
  }))

  await dbClient.send(new BatchWriteItemCommand({
    RequestItems: {
      ingredients: [{
        PutRequest: {
          Item: marshall({
            id: 1,
            name: '30 medium shrimp - peeled and deveined'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 2,
            name: '2 tablespoons olive oil'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 3,
            name: '2 tablespoons butter, melted'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 4,
            name: '2 cloves garlic, minced'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 5,
            name: '½ teaspoon kosher salt'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 6,
            name: '¼ teaspoon ground black pepper'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 7,
            name: '2 (6 ounce) beef top sirloin steaks'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 8,
            name: '2 cups orange juice'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 9,
            name: '1 cup apple cider vinegar'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 10,
            name: '½ cup Worcestershire sauce'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 11,
            name: '1 ½ tablespoons steak seasoning'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 12,
            name: 'freshly ground black pepper to taste'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 13,
            name: '2 teaspoons olive oil'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 14,
            name: 'sea salt to taste'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 15,
            name: '24 ounces dry fettuccine pasta'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 16,
            name: '1 cup butter'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 17,
            name: '¾ pint heavy cream'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 18,
            name: 'salt and pepper to taste'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 19,
            name: '1 dash garlic salt'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 20,
            name: '¾ cup grated Romano cheese'
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 21,
            name: '½ cup grated Parmesan cheese'
          })
        }
      }]
    }
  }))

  await dbClient.send(new BatchWriteItemCommand({
    RequestItems: {
      recipes: [{
        PutRequest: {
          Item: marshall({
            id: 1,
            name: 'Sexy Shrimp Scampi',
            url: 'https://www.allrecipes.com/recipe/136525/sexy-shrimp-scampi/',
            ingredients: [1, 2, 3, 4, 5, 6],
            directions: [12, 13, 14]
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 2,
            name: 'Cast Iron Pan-Seared Steak',
            url: 'https://www.allrecipes.com/recipe/262181/cast-iron-pan-seared-steak-oven-finished/',
            ingredients: [7, 8, 9, 10, 11, 12, 13, 14],
            directions: [4, 5, 6, 7, 8, 9, 10, 11
            ]
          })
        }
      }, {
        PutRequest: {
          Item: marshall({
            id: 3,
            name: 'To Die For Fettuccine Alfredo',
            url: 'https://www.allrecipes.com/recipe/23431/to-die-for-fettuccine-alfredo/',
            ingredients: [15, 16, 17, 18, 19, 20, 21],
            directions: [1, 2, 3]
          })
        }
      },
      {
        PutRequest: {
          Item: marshall({
            id: 4,
            name: 'Sexy Shrimp Scampi 2',
            url: 'https://www.allrecipes.com/recipe/136525/sexy-shrimp-scampi/',
            ingredients: [1, 2, 3, 4, 5, 6],
            directions: [12, 13, 14]
          })
        }
      }]
    }
  }))
}

seed()
