interface PasswordEncoder {
  /**
   * Encode password
   *
   * @param password
   */
  encode(password: string): Promise<string> | string

  /**
   * Check password hash
   *
   * @param password
   * @param hash
   */
  check(password: string, hash: string): Promise<boolean> | boolean
}

export default PasswordEncoder;