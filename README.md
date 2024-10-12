<h3>⚙️ Cài Đặt:</h3>
<p>Thêm FUI Validate JS vào trang HTML</p>
<ul>
  <li>Thêm file JS trước thẻ đóng <code>&lt;/body&gt;</code></li>
</ul>

<pre><code>&lt;script src="https://cdn.jsdelivr.net/gh/tuanduong1907/fui-validate@main/fui-validate.min.js"&gt;&lt;/script&gt;</code></pre>

<h2>Example:</h2>

<h3>Cấu trúc HTML form:</h3>

<pre><code>&lt;form id="form"&gt;
    &lt;div class="form-group"&gt;
        &lt;input type="text" id="fullname" name="fullname" placeholder="Nhập họ và tên..." /&gt;
        &lt;p class="form-message"&gt;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="form-group"&gt;
        &lt;input type="email" id="email" name="email" placeholder="Nhập địa chỉ email..." /&gt;
        &lt;p class="form-message"&gt;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="form-group"&gt;
        &lt;input type="password" id="password" name="password" placeholder="Nhập mật khẩu..." /&gt;
        &lt;p class="form-message"&gt;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="form-group"&gt;
        &lt;input type="password" id="password-confirm" name="password-confirm" placeholder="Xác nhận mật khẩu..." /&gt;
        &lt;p class="form-message"&gt;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="form-group"&gt;
        &lt;input type="file" id="image-upload" name="image-upload" /&gt;
        &lt;p class="form-message"&gt;&lt;/p&gt;
    &lt;/div&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>

<h3>Cách sử dụng (Gọi trong file JS):</h3>

<pre><code>Validator({
    form: "#form",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
        Validator.isRequired("#fullname", "Vui lòng nhập tên đầy đủ của bạn"),
        Validator.isEmail("#email", "Vui lòng nhập email hợp lệ"),
        Validator.minLength("#password", 6, "Mật khẩu phải có ít nhất 6 ký tự"),
        Validator.isConfirmed("#password-confirm", function() {
            return document.querySelector("#password").value;
        }, "Mật khẩu xác nhận không khớp"),
        Validator.isStrongPassword("#password", "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"),
        Validator.isAlphabet("#fullname", "Vui lòng chỉ nhập chữ cái"),
        Validator.isPhoneNumber("#phone", "Vui lòng nhập số điện thoại hợp lệ"),
        Validator.hasSpecialChar("#password", "Mật khẩu phải có ít nhất một ký tự đặc biệt"),
        Validator.isUrl("#website", "Vui lòng nhập URL hợp lệ"),
        Validator.isNumber("#number", "Vui lòng nhập số hợp lệ"),
        Validator.isImageUploaded("#image-upload", "Vui lòng upload hình ảnh"),
        Validator.maxLength("#fullname", 50, "Vui lòng nhập tối đa 50 ký tự")
    ],
    onSubmit: function (data) {
        console.log(data);  // Dữ liệu form sau khi xác thực thành công
    },
});</code></pre>

<h3>💡 Lưu ý:</h3>
<ul>
  <li><strong>form:</strong> Đây là <code>ID</code> của form mà bạn muốn xác thực. Đảm bảo rằng <code>ID</code> này đúng với <code>ID</code> trong HTML của bạn.</li>
  <li><strong>formGroupSelector:</strong> Sử dụng để chọn nhóm thẻ chứa các trường <code>input</code>. Điều này giúp dễ dàng quản lý và hiển thị thông báo lỗi tương ứng cho từng trường.</li>
  <li><strong>errorSelector:</strong> Xác định vị trí hiển thị thông báo lỗi. Đây là nơi mà thông báo xác thực sẽ xuất hiện khi có lỗi nhập liệu.</li>
</ul>

<h3>⚙️ Validation Rules:</h3>
<table>
  <thead>
    <tr>
      <th>Rules</th>
      <th>Sử Dụng</th>
      <th>Miêu Tả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>isRequired</code></td>
      <td><code>Validator.isRequired("Selector", "Message")</code></td>
      <td>Kiểm tra xem trường có giá trị hay không. Nếu không, thông báo lỗi sẽ được hiển thị.</td>
    </tr>
    <tr>
      <td><code>isEmail</code></td>
      <td><code>Validator.isEmail("Selector", "Message")</code></td>
      <td>Kiểm tra xem giá trị của trường có phải là một địa chỉ email hợp lệ hay không.</td>
    </tr>
    <tr>
      <td><code>minLength</code></td>
      <td><code>Validator.minLength("Selector", minLength(number), "Message")</code></td>
      <td>Kiểm tra xem độ dài của giá trị nhập vào có đạt yêu cầu tối thiểu hay không.</td>
    </tr>
    <tr>
      <td><code>maxLength</code></td>
      <td><code>Validator.maxLength("Selector", maxLength(number), "Message")</code></td>
      <td>Kiểm tra xem độ dài của giá trị nhập vào có vượt quá yêu cầu tối đa hay không.</td>
    </tr>
    <tr>
      <td><code>isConfirmed</code></td>
      <td><code>Validator.isConfirmed("Selector", function() { return value; }, "Message")</code></td>
      <td>Kiểm tra xem giá trị nhập vào có khớp với giá trị của một trường khác (ví dụ: xác nhận mật khẩu).</td>
    </tr>
    <tr>
      <td><code>isAlphabet</code></td>
      <td><code>Validator.isAlphabet("Selector", "Message")</code></td>
      <td>Kiểm tra xem giá trị của trường có chỉ chứa chữ cái hay không.</td>
    </tr>
    <tr>
      <td><code>isPhoneNumber</code></td>
      <td><code>Validator.isPhoneNumber("Selector", "Message")</code></td>
      <td>Kiểm tra xem giá trị của trường có phải là số điện thoại hợp lệ hay không.</td>
    </tr>
    <tr>
      <td><code>hasSpecialChar</code></td>
      <td><code>Validator.hasSpecialChar("Selector", "Message")</code></td>
      <td>Kiểm tra xem giá trị nhập vào có ít nhất một ký tự đặc biệt hay không.</td>
    </tr>
    <tr>
      <td><code>isUrl</code></td>
      <td><code>Validator.isUrl("Selector", "Message")</code></td>
      <td>Kiểm tra xem giá trị nhập vào có phải là một URL hợp lệ hay không.</td>
    </tr>
    <tr>
      <td><code>isNumber</code></td>
      <td><code>Validator.isNumber("Selector", "Message")</code></td>
      <td>Kiểm tra xem giá trị nhập vào có phải là số hay không.</td>
    </tr>
    <tr>
      <td><code>isImageUploaded</code></td>
      <td><code>Validator.isImageUploaded("Selector", "Message")</code></td>
      <td>Kiểm tra xem người dùng đã upload hình ảnh hay chưa.</td>
    </tr>
    <tr>
      <td><code>isStrongPassword</code></td>
      <td><code>Validator.isStrongPassword("Selector", "Message")</code></td>
      <td>Kiểm tra xem mật khẩu có đủ mạnh hay không. Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.</td>
    </tr>
  </tbody>
</table>

<p>
  <strong>- Tham số Selector:</strong> Truyền vào <code>id</code> của thẻ <code>input</code> cần validate.<br />
  <strong>- Tham số Message:</strong> Tham số này không bắt buộc. Nếu không được cung cấp, hệ thống sẽ dùng thông báo mặc định
