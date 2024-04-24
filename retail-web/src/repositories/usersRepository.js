// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import axios from "axios";
import resolveBaseURL from './resolveBaseURL'
import localUsersRepository from "@/repositories/localUsersRepository";

const baseURL = resolveBaseURL(
  import.meta.env.VITE_USERS_SERVICE_DOMAIN,
  import.meta.env.VITE_USERS_SERVICE_PORT,
  import.meta.env.VITE_USERS_SERVICE_PATH
)

const connection = axios.create({
  baseURL
})

const resource = "/users";
export default {
  get(offset, count) {
    if (!offset) {
      offset = 0
    }
    if (!count) {
      count = 50
    }
    return connection.get(`${resource}/all?offset=${offset}&count=${count}`)
  },
  async getUnclaimedUser({primaryInterest, ageRange}) {
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      let user = await localUsersRepository.findSelectedUser(primaryInterest, ageRange)
      return {
        data: [user]
      }
    } else {
      return connection.get(`${resource}/unclaimed?primaryPersona=${primaryInterest}&ageRange=${ageRange}`)
    }
  },
  async getRandomUser() {
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      let randomUser = await localUsersRepository.getRandomUser()
      return {
        data: [randomUser]
      }
    } else {
      return connection.get(`${resource}/random`)
    }
  },
  verifyAndUpdateUserPhoneNumber(userId, phoneNumber) {
    if (!userId || userId.length == 0)
      throw "userId required"
    let payload = {
      user_id: userId,
      phone_number: phoneNumber
    }
    return connection.put(`${resource}/id/${userId}/verifyphone`, payload)
  }
}
