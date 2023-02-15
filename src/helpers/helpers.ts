import axios from 'axios'
import { parse } from 'node-html-parser'

interface IURLTime {
    prepTime: string;
    cookTime: string;
}

interface IURLResponse {
    success: boolean;
    data?: IURLTime;
}

const findTime = (html: string): IURLTime => {
  try {
    const root = parse(html)
    const recipeValues = root.querySelectorAll('.mntl-recipe-details__value')
    const prepTime = recipeValues[0].childNodes[0].innerText
    const cookTime = recipeValues[1].childNodes[0].innerText
    return {
      prepTime,
      cookTime
    }
  } catch (error) {
    console.error(error)
    return {
      prepTime: 0,
      cookTime: 0
    }
  }
}

export const getURL = async(url: string): Promise<IURLResponse> => {
  try {
    const response = await axios.get(url)
    const getTime = findTime(response.data)
    return {
      success: true,
      ...getTime
    }
  } catch (error) {
    // we could add an extra to estimate locally
    return {
      success: false
    }
  }
}
