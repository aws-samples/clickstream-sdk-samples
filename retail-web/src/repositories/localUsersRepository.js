// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0


let allUsers = []
export default {
  async getAllUser() {
    if (allUsers.length > 0) {
      return allUsers
    } else {
      let response = await fetch('../../public/data/users.json')
      allUsers = JSON.parse(await response.text())
      return allUsers
    }
  },

  async getRandomUser() {
    await this.getAllUser()
    return this.getRandomItems(allUsers, 1)[0]
  },

  async findSelectedUser(primaryInterest, ageRange) {
    await this.getAllUser()
    let start = parseInt(ageRange.split('-')[0])
    let end = parseInt(ageRange.split('-')[1])
    for (let i = 0; i < allUsers.length; i++) {
      if (start <= allUsers[i].age && allUsers[i].age <= end && allUsers[i].persona.includes(primaryInterest)) {
        return allUsers[i]
      }
    }
    return {}
  },

  getCurrentUser() {
    let user = localStorage.getItem("currentUser")
    if (user) {
      return {
        data: JSON.parse(user)
      }
    } else {
      return {}
    }
  },

  saveCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  },

  clearCurrentUser() {
    localStorage.removeItem("currentUser")
  },

  getRandomItems(array, count) {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}
